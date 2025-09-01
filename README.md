# Caner Karaca's Personal Blog

A Jekyll-based personal blog website built with modern web technologies, featuring automated builds, responsive design, and optimized performance.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Technologies](#️-technologies)
- [Features](#-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Automated Workflows](#-automated-workflows)
- [Maintenance](#-maintenance)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## 🚀 Prerequisites

### System Requirements
- **Node.js** v18+ (LTS recommended)
- **npm** v8+ or **yarn** v1.22+
- **Ruby** v2.7+ (for Jekyll)
- **Bundler** v2.0+ (Ruby gem manager)
- **Git** v2.0+

### Environment Setup
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check Ruby version (should be 2.7+)
ruby --version

# Check if Bundler is installed
bundle --version
```

### Using .nvmrc for Node Version Management
This project includes a `.nvmrc` file for consistent Node.js versioning:

```bash
# Install and use the specified Node version
nvm install
nvm use
```

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/CanerKaraca23/CanerKaraca23.github.io.git
cd CanerKaraca23.github.io
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Ruby Dependencies (Optional - for full Jekyll features)
```bash
# Install Bundler if not already installed
gem install bundler

# Install Jekyll and other Ruby gems
bundle install
```

### 4. Verify Installation
```bash
# Test the build process
npm run build

# Start development server
npm run dev
```

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build project for production |
| `npm run serve` | Serve built site locally |
| `npm start` | Alias for `npm run dev` |

### Development Workflow

```bash
# Start development with live reload
npm run dev
```

This will:
1. Build CSS, JS, and copy static files
2. Start Jekyll build process (if available)
3. Launch BrowserSync server at `http://localhost:3000`
4. Watch for file changes and auto-reload browser

### Working with the Development Server

- **Local URL**: `http://localhost:3000`
- **BrowserSync UI**: `http://localhost:3001`
- **Auto-reload**: Enabled for CSS, JS, HTML, and Markdown files
- **Cross-device testing**: Access via your local IP for mobile testing

### File Watching

The development server watches these file types:
- `assets/css/**/*.css` - Stylesheets
- `assets/js/**/*.js` - JavaScript files  
- `assets/img/**/*` - Images
- `*.html`, `_layouts/*.html`, `_includes/*.html` - HTML templates
- `_pages/*.html`, `_posts/*` - Content files
- `*.json`, `*.xml` - Configuration files

### Creating Content

#### New Blog Posts
Create new posts in the `_posts/` directory:
```bash
# File naming convention: YYYY-MM-DD-title.md
touch _posts/2024-01-15-my-new-post.md
```

#### New Pages
Add static pages to the `_pages/` directory:
```bash
touch _pages/about.md
```

## 📁 Project Structure

```
├── .github/            # GitHub Actions and workflows
│   └── dependabot.yml # Dependency update automation
├── _includes/          # Reusable Jekyll components
│   ├── head.html      # HTML head section
│   ├── javascripts.html # JavaScript includes
│   └── analytics.html # Analytics tracking
├── _layouts/           # Jekyll page templates
│   └── default.html   # Main layout template
├── _pages/            # Static pages (About, Contact, etc.)
├── _posts/            # Blog posts (Markdown files)
├── _data/             # Jekyll data files (YAML, JSON)
├── assets/            # Static assets
│   ├── css/           # Stylesheets and themes
│   ├── js/            # JavaScript files
│   └── img/           # Images and media
├── _site/             # Generated site (auto-generated)
├── gulpfile.js        # Gulp build configuration
├── package.json       # Node.js dependencies and scripts
├── _config.yml        # Jekyll configuration
├── .nvmrc             # Node.js version specification
├── Gemfile            # Ruby dependencies
└── LICENSE            # Project license
```

### Key Directories

- **`_includes/`**: Reusable HTML components included in layouts
- **`_layouts/`**: HTML templates that wrap your content
- **`_pages/`**: Static pages that don't follow the blog post format
- **`_posts/`**: Blog posts written in Markdown with YAML front matter
- **`assets/`**: Static files (CSS, JavaScript, images) served directly
- **`_site/`**: Generated static site (excluded from version control)
- **`.github/`**: GitHub-specific configuration and workflows

## 🛠️ Technologies

### Core Technologies
- **[Jekyll](https://jekyllrb.com/)** - Static site generator with Ruby
- **[Gulp 4](https://gulpjs.com/)** - Build automation and task runner
- **[BrowserSync](https://browsersync.io/)** - Live reload development server
- **[Node.js](https://nodejs.org/)** - JavaScript runtime for build tools

### Frontend Technologies
- **SCSS/CSS** - Styling with Sass preprocessing
- **JavaScript/jQuery** - Interactive features and DOM manipulation
- **HTML5** - Semantic markup
- **Responsive Design** - Mobile-first approach

### Development Tools
- **npm** - Node.js package management
- **Bundler** - Ruby gem dependency management
- **Git** - Version control
- **GitHub Pages** - Hosting and deployment

### Build Pipeline
- **Asset Compilation** - CSS and JavaScript processing
- **Image Optimization** - Automated image compression
- **Live Reload** - Instant browser refresh during development
- **File Watching** - Automatic rebuilds on file changes

## 🔧 Features

### User Experience
- **Responsive Design** - Mobile-first, works on all devices
- **Search Functionality** - Fast client-side search
- **Infinite Scroll** - Seamless content loading
- **Tag-based Filtering** - Organize and filter content by tags
- **Night Mode** - Automatic dark/light theme switching

### Performance & SEO
- **SEO Optimization** - Meta tags, structured data, sitemaps
- **Security Headers** - Enhanced security configuration
- **Performance Optimizations** - Minified assets, lazy loading
- **Fast Loading** - Optimized build pipeline
- **Caching Strategy** - Browser and CDN caching

### Developer Experience
- **Live Reload** - Instant preview of changes
- **Hot Module Replacement** - Fast development workflow
- **Source Maps** - Easy debugging
- **Linting** - Code quality enforcement
- **Automated Builds** - CI/CD pipeline integration

## 🚀 Deployment

### GitHub Pages (Automatic)

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

**Live URL**: https://canerkaraca23.github.io/

### Manual Deployment

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Verify the build**:
   ```bash
   npm run serve
   # Visit http://localhost:3000 to test
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   git add .
   git commit -m "Deploy site updates"
   git push origin main
   ```

### Local Production Testing

To test the production build locally:

```bash
# Build for production
npm run build

# Serve the built site
npm run serve
```

### Deployment Checklist

- [ ] All tests pass locally
- [ ] Build completes without errors
- [ ] Site renders correctly in production mode
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Search functionality works
- [ ] Mobile responsiveness verified

## 🤝 Contributing

We welcome contributions to improve this blog! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CanerKaraca23.github.io.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines

#### Code Style
- Use 2 spaces for indentation
- Follow existing naming conventions
- Write descriptive commit messages
- Add comments for complex logic

#### Before Submitting
- [ ] Test your changes locally
- [ ] Run the build process successfully
- [ ] Verify responsive design
- [ ] Check for console errors
- [ ] Update documentation if needed

#### Commit Message Format
```
type: brief description

More detailed explanation if needed

Fixes #issue-number
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Test thoroughly** on different devices and browsers
3. **Create a descriptive PR title** and description
4. **Reference any related issues**
5. **Be responsive to feedback** during code review

### Content Contributions

#### Blog Posts
- Follow the naming convention: `YYYY-MM-DD-title.md`
- Include proper YAML front matter
- Use appropriate tags and categories
- Optimize images before adding them

#### Bug Reports
Use the issue template and include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

#### Feature Requests
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Discuss potential alternatives

## 🤖 Automated Workflows

### Dependency Management

**Dependabot** is configured to automatically check for dependency updates across multiple package ecosystems:

- **NPM packages** - Daily checks for Node.js dependencies
- **Ruby gems** - Daily checks for Jekyll and Ruby dependencies  
- **GitHub Actions** - Daily checks for workflow updates
- **Docker images** - Daily checks for container updates

#### Dependabot Configuration

Located in `.github/dependabot.yml`, monitoring:
- `npm` (Node.js packages)
- `bundler` (Ruby gems)
- `github-actions` (Workflow dependencies)
- `docker`, `gradle`, `maven`, `pip`, and other ecosystems

#### Managing Dependabot PRs

1. **Review the changes** in the automated PR
2. **Test locally** if significant updates
3. **Merge** if tests pass and no breaking changes
4. **Close** if the update isn't needed

### GitHub Pages Deployment

- **Automatic deployment** on push to `main` branch
- **Build process** uses Jekyll's built-in GitHub Pages integration
- **Custom domain** configured via `_config.yml`
- **HTTPS** enabled by default

### Monitoring

- **Build status** visible in GitHub repository
- **Deployment logs** available in GitHub Pages settings
- **Analytics** integrated via Google Analytics

## 🔧 Maintenance

### Regular Maintenance Tasks

#### Weekly
- [ ] Review and merge Dependabot PRs
- [ ] Check site performance and loading times
- [ ] Verify all links are working
- [ ] Review analytics data

#### Monthly  
- [ ] Update Node.js version if needed (check `.nvmrc`)
- [ ] Review and update content
- [ ] Check for broken images or assets
- [ ] Update documentation

#### Quarterly
- [ ] Review and update dependencies manually
- [ ] Performance audit and optimization
- [ ] Security review
- [ ] Backup content and configuration

### Updating Dependencies

#### Node.js Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages to latest versions
npm update

# Update specific package
npm install package-name@latest
```

#### Ruby Dependencies
```bash
# Update all gems
bundle update

# Update specific gem
bundle update gem-name

# Check for security vulnerabilities
bundle audit
```

### Performance Monitoring

#### Build Performance
```bash
# Time the build process
time npm run build

# Analyze bundle size
npm run build && du -sh _site/
```

#### Site Performance
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check mobile performance regularly
- Review network requests in dev tools

### Backup Procedures

#### Content Backup
```bash
# Backup posts and pages
cp -r _posts/ backup/posts-$(date +%Y%m%d)
cp -r _pages/ backup/pages-$(date +%Y%m%d)
```

#### Configuration Backup
```bash
# Backup configuration files
cp _config.yml backup/config-$(date +%Y%m%d).yml
cp package.json backup/package-$(date +%Y%m%d).json
```

## 🔍 Troubleshooting

### Common Issues

#### Build Failures

**Issue**: `Jekyll not found` error
```bash
# Solution: Install Jekyll
gem install jekyll bundler
bundle install
```

**Issue**: `npm run build` fails
```bash
# Check Node.js version
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Development Server Issues

**Issue**: Browser not reloading automatically
```bash
# Restart development server
npm run dev
```

**Issue**: Port 3000 already in use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill
npm run dev
```

#### Jekyll Issues

**Issue**: Ruby version conflicts
```bash
# Check Ruby version
ruby --version

# Install correct Ruby version with rbenv
rbenv install 2.7.0
rbenv local 2.7.0
```

**Issue**: Missing gems
```bash
# Install missing dependencies
bundle install
```

### Performance Issues

#### Slow Build Times
- Check for large image files in `assets/img/`
- Remove unused dependencies from `package.json`
- Clear Jekyll cache: `bundle exec jekyll clean`

#### Large Bundle Size
- Optimize images before adding them
- Remove unused CSS and JavaScript
- Use gulp tasks for asset optimization

### Getting Help

1. **Check the logs** for specific error messages
2. **Search existing issues** on GitHub
3. **Create a new issue** with:
   - Error message
   - Steps to reproduce
   - System information
   - Browser details

### Debug Mode

Enable verbose logging:
```bash
# Verbose npm output
npm run build --verbose

# Jekyll debug mode
bundle exec jekyll build --verbose
```

## 📄 License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial use** - Use for commercial purposes
- ✅ **Modification** - Adapt and build upon the material
- ✅ **Distribution** - Copy and redistribute in any format
- ✅ **Private use** - Use for personal projects
- ❌ **No warranty** - No warranty or liability provided
- ❌ **No attribution required** - Though attribution is appreciated

---

**Made with ❤️ by [Caner Karaca](https://github.com/CanerKaraca23)**

For questions or support, please [open an issue](https://github.com/CanerKaraca23/CanerKaraca23.github.io/issues) or contact [canerkaraca_23@hotmail.com](mailto:canerkaraca_23@hotmail.com).