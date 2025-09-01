# Security Quick Reference

## Daily Commands

```bash
# Quick security check
npm audit && bundle-audit check

# Update dependencies  
npm update && bundle update

# Build and test
npm run build
```

## Vulnerability Found?

### High/Critical
1. `npm audit fix` or `bundle update [gem-name]`
2. Test: `npm run build`
3. Deploy immediately

### Medium/Low  
1. Schedule for next maintenance window
2. Document in security log
3. Monitor for escalation

## Emergency Contacts
- Repository: GitHub Security Advisories
- Maintainer: @CanerKaraca23

## Status
- ✅ NPM: 0 vulnerabilities
- ✅ Bundle: 0 vulnerabilities  
- ✅ Last checked: January 21, 2025
- 🔄 Next check: April 21, 2025