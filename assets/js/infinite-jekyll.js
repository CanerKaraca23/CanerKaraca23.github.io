$(() => {
  'use strict';

  let postURLs,
    isFetchingPosts = false,
    shouldFetchPosts = true;
  const loadNewPostsThreshold = 10;

  // Cache DOM elements for better performance
  const $tagMaster = $('.tag-master:not(.hidden)'),
    $postList = $tagMaster.find('.post-list'),
    $spinner = $('.spinner');

  // Get initial posts count
  const postsToLoad = $postList.children().length;

  // Load the JSON file containing all URLs
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // If there's no spinner, it's not a page where posts should be fetched
  if ($spinner.length < 1) {
    shouldFetchPosts = false;
  }

  function loadPostData() {
    // If a tag was passed as a url parameter then use it to filter the urls
    if (urlParams.has('tag')) {
      const tag = urlParams.get('tag');
      const tagElement = document.getElementById(tag);

      if (tagElement) {
        tagElement.classList.toggle('hidden');
      }

      $.getJSON('./posts-by-tag.json')
        .done(data => {
          if (data && Array.isArray(data)) {
            const tagItem = data.find(el => el.tag === tag);
            if (tagItem && tagItem.posts) {
              postURLs = tagItem.posts;
              // If there aren't any more posts available to load than already visible, disable fetching
              if (postURLs.length <= postsToLoad) {
                disableFetching();
              }
            } else {
              console.warn('No posts found for tag:', tag);
              disableFetching();
            }
          }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          console.error('Failed to load posts-by-tag.json:', textStatus, errorThrown);
          disableFetching();
        });
    } else {
      $.getJSON('./all-posts.json')
        .done(data => {
          if (data && data.posts) {
            postURLs = data.posts;
            // If there aren't any more posts available to load than already visible, disable fetching
            if (postURLs.length <= postsToLoad) {
              disableFetching();
            }
          }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          console.error('Failed to load all-posts.json:', textStatus, errorThrown);
          disableFetching();
        });
    }
  }

  // Initialize post loading
  loadPostData();

  // Throttle scroll events for better performance
  let scrollTimeout;
  function throttledScrollHandler() {
    if (scrollTimeout) {
      return;
    }

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;

      if (!shouldFetchPosts || isFetchingPosts) {
        return;
      }

      const windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();

      // If we've scrolled past the loadNewPostsThreshold, fetch posts
      if (documentHeight - loadNewPostsThreshold < bottomScrollPosition) {
        fetchPosts();
      }
    }, 100); // 100ms throttle
  }

  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(throttledScrollHandler);

  // Fetch a chunk of posts
  function fetchPosts() {
    // Exit if postURLs haven't been loaded
    if (!postURLs || !Array.isArray(postURLs)) {
      console.warn('postURLs not available or invalid');
      return;
    }

    isFetchingPosts = true;

    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    let loadedPosts = 0;
    const postCount = $postList.children().length,
      callback = function () {
        loadedPosts++;
        const postIndex = postCount + loadedPosts;

        if (postIndex > postURLs.length - 1) {
          disableFetching();
          return;
        }

        if (loadedPosts < postsToLoad) {
          fetchPostWithIndex(postIndex, callback);
        } else {
          isFetchingPosts = false;
        }
      };

    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    if (!postURLs || index >= postURLs.length) {
      console.warn('Invalid post index or postURLs not available');
      if (callback) {
        callback();
      }
      return;
    }

    const postURL = postURLs[index];

    $.get(postURL)
      .done(data => {
        try {
          const $postContent = $(data).find('.post');
          if ($postContent.length > 0) {
            $postContent.appendTo($postList);
          }
        } catch (error) {
          console.error('Error processing post data:', error);
        }
        if (callback) {
          callback();
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error('Failed to load post:', postURL, textStatus, errorThrown);
        if (callback) {
          callback();
        }
      });
  }

  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $spinner.fadeOut();
  }
});
