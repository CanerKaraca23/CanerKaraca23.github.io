source 'https://rubygems.org'

# Use the latest Ruby version supported by GitHub Pages
ruby '~> 3.2.0'

# GitHub Pages Jekyll version (for GitHub Pages deployment)
gem 'github-pages', '~> 232', group: :jekyll_plugins

# Jekyll plugins
group :jekyll_plugins do
  gem 'jekyll-paginate', '~> 1.1'
  gem 'jekyll-feed', '~> 0.17'
  gem 'jekyll-sitemap', '~> 1.4'
  gem 'jekyll-seo-tag', '~> 2.8'
end

# Performance optimizations
gem 'kramdown-parser-gfm', '~> 1.1'

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:windows]

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.1', platforms: [:windows]

# Jekyll webrick for Ruby 3+
gem 'webrick', '~> 1.8'