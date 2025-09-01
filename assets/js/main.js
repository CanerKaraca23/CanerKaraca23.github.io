$(function () {
  'use strict';

  // Cache DOM elements for better performance
  var $window = $(window),
      $htmlBody = $('html, body'),
      $topButton = $('.top'),
      $flexContainer = $('.flex-container'),
      $searchBox = $('.search-box'),
      $searchClose = $('.search-icon-close'),
      $searchInput = $('#search-input'),
      $menuIcon = $('.menu-icon, .menu-icon-close'),
      $searchIcon = $('.search-icon');

  var waiting;

  /* -------- Scroll to top button ------- */
  $topButton.on('click', function() {
    $htmlBody
      .stop()
      .animate({ scrollTop: 0 }, 'slow', 'swing');
  });

  // Throttle scroll events for better performance
  var scrollTimeout;
  function throttledScrollHandler() {
    if (scrollTimeout) {
      return;
    }
    
    scrollTimeout = setTimeout(function() {
      scrollTimeout = null;
      
      if ($window.scrollTop() > $window.height()) {
        $topButton.addClass('is-active');
      } else {
        $topButton.removeClass('is-active');
      }
    }, 100); // 100ms throttle
  }

  $window.on('scroll', throttledScrollHandler);

  // Menu button - use event delegation to prevent memory leaks
  $menuIcon.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    if ($flexContainer.hasClass('active')) {
      hideLayer();
    } else {
      showLayer();
    }
  });

  function showLayer() {
    $flexContainer.addClass('active');
    setTimeout(function () {
      $flexContainer.removeClass('transparent').addClass('opaque');
    }, 10);
  }

  function hideLayer() {
    $flexContainer.removeClass('opaque').addClass('transparent');
    setTimeout(function() {
      $flexContainer.removeClass('active');
    }, 600);
  }

  // Click to close
  $flexContainer.on('click', function (e) {
    if ($flexContainer.hasClass('active') && e.target.tagName !== 'A') {
      if (e.target.classList.contains('night')) {
        clearTimeout(waiting);
        waiting = setTimeout(function() {
          hideLayer();
        }, 1000);
      } else {
        hideLayer();
      }
    }
  });

  // Press Escape key to close menu and search
  $window.on('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($flexContainer.hasClass('active')) {
        hideLayer();
      } else if ($searchBox.hasClass('search-active')) {
        $searchBox.removeClass('search-active');
      }
    }
  });

  // Search functionality
  var searchCloseHandlerAttached = false;

  $searchIcon.on('click', function (e) {
    e.preventDefault();
    
    // Only toggle search if not inline search form
    if ($('.search-form.inline').length === 0) {
      $searchBox.toggleClass('search-active');
    }
    
    $searchInput.focus();
    
    // Attach close handler only once to prevent memory leaks
    if ($searchBox.hasClass('search-active') && !searchCloseHandlerAttached) {
      $searchClose.one('click', function (e) {
        e.preventDefault();
        $searchBox.removeClass('search-active');
        searchCloseHandlerAttached = false;
      });
      searchCloseHandlerAttached = true;
    } else if (!$searchBox.hasClass('search-active')) {
      searchCloseHandlerAttached = false;
    }
  });

  // Cleanup on page unload to prevent memory leaks
  $window.on('beforeunload', function() {
    clearTimeout(waiting);
    clearTimeout(scrollTimeout);
  });
});