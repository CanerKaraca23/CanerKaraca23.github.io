# Development Guide

## Code Quality Tools

This project uses modern code quality tools to maintain consistent and clean code:

### ESLint Configuration
- **Modern ES2022+ rules** with strict standards
- **Custom rules** for spacing, indentation, and code style
- **Auto-fixing** for most style issues
- Excludes third-party bundled files

### Prettier Configuration
- **Consistent formatting** across all JavaScript files
- **2-space indentation**, single quotes, no trailing commas
- **100-character line limit** for readability
- Excludes minified and bundled files

### Available Scripts

```bash
# Run ESLint to check for issues
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is properly formatted
npm run format:check

# Run both linting and formatting (recommended)
npm run quality
```

### Development Workflow

1. Make your code changes
2. Run `npm run quality` to lint and format code
3. Test your changes with `npm run build`
4. Commit your changes

### Asset Optimization

The project has been cleaned up to remove:
- **39 unused CSS highlighter themes** (kept only the active theme)
- **Unused CSS files** with improper naming
- **Duplicate Font Awesome files**
- **Unused dependencies** (gulp-cache)

Only essential assets are included:
- `syntax-base16.monokai.dark.css` (active highlighter theme)
- `_theme_original.css` (backup reference)
- `font-awesome.min.css` (icons)
- Core JavaScript files (main.js, infinite-jekyll.js)
- Third-party search library (jekyll-search.js - excluded from linting)

### File Structure

```
assets/
├── css/
│   ├── highlighter/          # Syntax highlighting themes
│   ├── main.css             # Main stylesheet
│   └── ...
├── js/
│   ├── main.js              # Main JavaScript functionality  
│   ├── infinite-jekyll.js   # Infinite scroll functionality
│   └── jekyll-search.js     # Third-party search (excluded from linting)
└── fonts/                   # Font files and CSS
```