This is a site made with Eleventy (11ty) and styled using Tailwind 4.x. It uses some components from the Tailwind Plus library.

The site is very simple, composed of only 4 pages:
- Home (found at content/index.liquid)
- Portfolio (at content/portfolio.liquid)
- Services (at content/services.liquid)
- About (at content/about.liquid)

They make use of the base.liquid layout.

## Development Commands
- `npm start` - Start dev server with hot reload (runs at http://localhost:8080)
- `npm run build` - Build production site to _site/
- `npm run tailwind-watch` - Watch and compile Tailwind CSS (run alongside npm start)
- To work on styles: Run both `npm start` and `npm run tailwind-watch` in separate terminals

## Directory Structure
- `content/` - Source files for pages (input directory)
- `_includes/` - Liquid templates and components
  - `_includes/layouts/` - Page layouts (base.liquid is the main layout)
  - `_includes/header.liquid` - Site header/navigation component
- `_data/` - Global data files
  - `_data/metadata.js` - Site metadata (title, description, author)
- `_config/` - Eleventy configuration modules
  - `_config/filters.js` - Custom Liquid filters
- `public/` - Static assets (copied to output as-is)
  - `public/css/` - CSS files including Tailwind source
- `_site/` - Build output (gitignored)

## Styling Details
- Uses Tailwind 4.x with the new `@import "tailwindcss"` syntax
- Source file: `public/css/tailwind-index.css`
- Compiled output: `public/css/index.css`
- CSS is inlined in base.liquid for performance using {% css %} bundles
- Additional modular CSS: fonts.css, colors.css
- Uses Tailwind Plus elements (@tailwindplus/elements) loaded in base.liquid
- Dark mode classes supported (dark:*)

## Navigation
- Uses @11ty/eleventy-navigation plugin
- Pages define navigation via frontmatter:
  ```js
  ---js
  const eleventyNavigation = {
    key: "Page Name",
    order: 1
  };
  ---
  ```
- Navigation rendered in header.liquid using `collections.all | eleventyNavigation`

## Template Engine
- Primary: Liquid (configured to look in _includes/ and project root)
- Template formats enabled: md, njk, html, liquid, 11ty.js
- Markdown uses Liquid preprocessing
- HTML uses Liquid preprocessing

## Key Features & Plugins
- Image optimization (eleventy-img) - auto-generates avif/webp
- Syntax highlighting (eleventy-plugin-syntaxhighlight)
- CSS/JS bundles with {% css %} and {% js %} shortcodes
- Heading anchors (@zachleat/heading-anchors)
- Draft support via preprocessor (checks data.draft in build mode)

## Custom Filters Available
- `readableDate` - Format dates with Luxon
- `htmlDateString` - ISO date strings
- `head` - Get first n elements
- `filterTagList` - Remove system tags
- `sortAlphabetically` - Sort strings

## Important Notes
- Site metadata URL has typo: "https//noelr.dev" (missing colon)
- Base layout inlines all CSS for performance
- Server watches _site/**/*.html for hot reload
- Liquid root configured to allow includes from project root

## Communication style preferences for Claude:
- Be very concise. Don't provide explanations I don't ask for.
