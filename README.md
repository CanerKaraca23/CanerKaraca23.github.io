# Caner Karaca's Personal Blog

A Jekyll-based personal blog website built with modern web technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (use `.nvmrc` for version management)
- Ruby & Jekyll (for full site generation)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Serve built site
npm run serve
```

## 📁 Project Structure

```
├── _includes/          # Reusable components
├── _layouts/           # Page templates  
├── _pages/            # Static pages
├── _posts/            # Blog posts
├── assets/            # Static assets (CSS, JS, images)
├── gulpfile.js        # Build configuration
└── _config.yml        # Jekyll configuration
```

## 🛠️ Technologies

- **Jekyll** - Static site generator
- **Gulp 4** - Build automation
- **BrowserSync** - Live reload development server
- **SCSS/CSS** - Styling
- **JavaScript/jQuery** - Interactive features

## 🔧 Features

- Responsive design
- Search functionality
- Infinite scroll
- Tag-based filtering
- SEO optimization
- Security headers
- Performance optimizations

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for automated building, testing, and deployment.

### Workflows

#### CI Workflow (`.github/workflows/ci.yml`)
Runs on every push to `main`/`develop` branches and pull requests:

- **Linting**: ESLint validation for JavaScript files
- **Building**: 
  - Node.js dependencies installation
  - Ruby/Jekyll dependencies installation  
  - Gulp build process
  - Jekyll site generation
- **Artifacts**: Uploads built site for review

#### Deployment Workflow (`.github/workflows/deploy.yml`)
Automatically deploys to GitHub Pages on push to `main`:

- **Build**: Same as CI workflow
- **Deploy**: Deploys built site to GitHub Pages

### Dependabot

Automated dependency updates are configured for:
- **GitHub Actions**: Weekly updates for workflow dependencies
- **npm**: Weekly updates for Node.js packages (Gulp, BrowserSync, etc.)
- **Bundler**: Weekly updates for Ruby gems (Jekyll, plugins, etc.)

### Local Development vs Production

- **Local**: Uses Gulp for live-reload development server
- **Production**: Uses Jekyll for optimized static site generation
- **Both**: Share the same source files and build processes

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.