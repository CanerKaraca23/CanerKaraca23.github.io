# Internationalization (i18n) Implementation

This site now supports internationalization for month names and common UI text. The implementation uses Jekyll's built-in `_data` directory for translations.

## How it works

1. **Translation Files**: Located in `_data/` directory
   - `_data/tr.yml` - Turkish translations
   - `_data/en.yml` - English translations (fallback)

2. **Localized Date Formatting**: 
   - `_includes/localized_date.html` - Custom include for date formatting with translated month names
   - Automatically uses the locale set in `_config.yml` (currently "tr" for Turkish)
   - Falls back to English if translation is missing

3. **Usage**: 
   ```liquid
   {% include localized_date.html date=post.date format="long" %}
   ```

## Supported Languages

- **Turkish (tr)**: Full support with all month names and UI text
- **English (en)**: Fallback language

## Adding New Languages

To add support for a new language:

1. Create a new file in `_data/` directory (e.g., `_data/fr.yml` for French)
2. Follow the same structure as existing files
3. Update `locale` in `_config.yml` to the new language code

## Current Translations

### Month Names
- January → Ocak
- February → Şubat  
- March → Mart
- April → Nisan
- May → Mayıs
- June → Haziran
- July → Temmuz
- August → Ağustos
- September → Eylül
- October → Ekim
- November → Kasım
- December → Aralık

### UI Text
- "Read More" → "Daha Fazla Oku"
- "minute read" → "dakika okuma süresi"
- "less than" → "daha kısa okuma süresi"

## Files Modified

- `_includes/post_meta.html` - Updated to use localized date formatting
- `_layouts/post.html` - Updated "Read More" text to use translations
- `_pages/archive.html` - Updated "Read More" text to use translations