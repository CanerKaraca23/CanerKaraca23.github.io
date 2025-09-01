# Security Maintenance Guide

This guide provides instructions for maintaining the security of the CanerKaraca23.github.io repository.

## Quick Security Check Commands

### For Node.js Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable vulnerabilities  
npm audit fix

# View detailed vulnerability report
npm audit --json
```

### For Ruby Gem Dependencies
```bash
# Update ruby-advisory-db and check for vulnerabilities
bundle-audit check

# Update the advisory database manually
bundle-audit update

# Check for insecure sources in Gemfile
bundle-audit check --verbose
```

## Monthly Security Maintenance Checklist

### Dependencies Review
- [ ] Run `npm audit` and review results
- [ ] Run `bundle-audit check` and review results  
- [ ] Check for deprecated packages and plan upgrades
- [ ] Review GitHub security advisories for the repository

### Dependency Updates
- [ ] Update Node.js dependencies: `npm update`
- [ ] Update Ruby gems: `bundle update`
- [ ] Test build process after updates: `npm run build`
- [ ] Commit updated lock files

### Security Configuration Review
- [ ] Review CSP headers in `_includes/security-headers.html`
- [ ] Check for any new external dependencies that need CSP updates
- [ ] Verify HTTPS is working correctly
- [ ] Test site functionality after any security updates

## Automated Security Setup (Recommended)

### GitHub Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    
  # Enable version updates for bundler
  - package-ecosystem: "bundler" 
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

### GitHub Actions Security Workflow

Create `.github/workflows/security-audit.yml`:

```yaml
name: Security Audit

on:
  schedule:
    # Run every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security-audit:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.2'
        bundler-cache: true
        
    - name: Install dependencies
      run: |
        npm ci
        gem install bundle-audit
        
    - name: Run npm security audit
      run: npm audit
      
    - name: Run bundle security audit  
      run: bundle-audit check
```

## Emergency Response Procedures

### High Severity Vulnerability Found

1. **Immediate Action**:
   - Stop any CI/CD deployments
   - Assess if the vulnerability affects production

2. **Investigation**:
   - Review vulnerability details from audit output
   - Check if vulnerability is exploitable in current configuration
   - Determine impact scope

3. **Remediation**:
   - Update affected dependencies: `npm update [package]` or `bundle update [gem]`
   - Test functionality after updates
   - Review for breaking changes
   - Deploy updates immediately if critical

4. **Verification**:
   - Re-run security audits to confirm fix
   - Test site functionality
   - Update security documentation

### Medium/Low Severity Vulnerabilities

1. **Schedule Updates**: Plan updates for next maintenance window
2. **Risk Assessment**: Evaluate if temporary mitigations are needed
3. **Testing**: Thoroughly test updates in development environment
4. **Documentation**: Update security audit report with findings

## Security Best Practices

### Dependencies
- Always use lock files (package-lock.json, Gemfile.lock)
- Regularly update dependencies, especially security updates
- Remove unused dependencies
- Use exact versions for critical dependencies

### Content Security Policy
- Review CSP headers quarterly
- Use nonce or hash-based CSP when possible
- Avoid 'unsafe-inline' and 'unsafe-eval' directives
- Test CSP changes thoroughly

### Build Security
- Keep build tools updated
- Use trusted sources for dependencies
- Implement checksum verification where possible
- Scan built artifacts for vulnerabilities

## Contact Information

### Security Issues
- **Repository**: Create a security advisory via GitHub
- **Email**: Report via GitHub's private vulnerability reporting
- **Urgent Issues**: Contact repository maintainers directly

### Resources
- [GitHub Security Advisory Database](https://github.com/advisories)
- [Ruby Advisory Database](https://github.com/rubysec/ruby-advisory-db)
- [npm Security Advisories](https://www.npmjs.com/advisories)
- [OWASP Static Site Security](https://owasp.org/www-project-top-ten/)

---

*Last updated: January 21, 2025*  
*Version: 1.0*