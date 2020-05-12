# Configuration

**CODEDOC**'s configuration is read from `.codedoc/config.ts`. A typical config file looks like this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/my-project',
  },
  page: {
    title: {
      base: 'My Project'
    },
    favicon: '/favicon.ico'
  },
  misc: {
    github: {
      user: 'johndoe',
      repo: 'my-project',
    },
    gitter: {
      room: 'my-project'
    }
  }
});
```

---

## Theme

The theme of your project is configured in a different file, `.codedoc/theme.ts`. This
is because the theme is also imported by client-side codes (codedoc's bundle) and hence
should not be mixed up with your typical project configuration, which might include
imports and elements that cannot be transported (or should not be transported) to the
bundle.

> :Buttons
> > :Button label=Read More on Theme, url=/docs/theme

---

## Available Properties

The following are all of the configurable properties, set to their default values:


```ts | .codedoc/config.ts
import { configuration,
         DefaultMarkdownCustomComponents,
         DefaultMarkdownCustomInlineComponents,
         DefaultToCMarkdownCustomComponents,
         DefaultToCMarkdownCustomInlineComponents,
       } from '@codedoc/core';
import { guessTitle } from '@codedoc/core/transport';

import { theme } from './theme';

export const config = configuration({
  theme,                                 // --> always include your theme
/*!*/  src: {                                 // @see /docs/config/entry
    base: 'docs/md',                     // --> the base folder for all markdowns
    toc: '_toc.md',                      // --> markdown file for toc, relative to `base`
    not_found: '404.md'                  // --> markdown file for 404 page, relative to `base`
    pick: /\.md$/,                       // --> which files to pick (default: .md files)
    drop: /(^_)|(\/_)/,                  // --> which files to drop (default: _something.md files)
  },

/*!*/  dest: {                                // @see /docs/config/output
    html: '.',                           // --> the base folder for HTML files
    assets: '.',                         // --> the base folder for assets
    bundle: 'docs/assets',               // --> where to store codedoc's bundle (relative to `assets`)
    styles: 'docs/assets',               // --> where to store codedoc's styles (relative to `assets`)
    namespace: '',                       // --> project namespace
  },

/*!*/  bundle: {                              // @see /docs/config/bundle
    init: [                              // --> a list of initialization scripts for codedoc's bundle
      codeSelection$,                    // --> this fella makes code snippets interactively selectable
      sameLineLengthInCodes$,            // --> this fella ensures the same line length in code snippets
      codeLineHints$,                    // --> this fella is responsible for hints in code snippets
      codeLineRef$,                      // --> this fella is responsible for references in code snippets
      smartCopy$,                        // --> this fella makes `CopyButton` work
      copyHeadings$,                     // --> this fella makes links to headings easily copiable
      contentNavHighlight$,              // --> this fella highlights current section in content nav
      deferredIframes$,                  // --> this fella defers iframes for faster loading
      smoothLoading$,                    // --> this fella makes loading new pages smoothly like an SPA app
      tocHighlight$,                     // --> this fella highlights the current page in ToC
      postNavSearch$,                    // --> this fella is repsonsible for searching a term in a page
    ],
  },

  dev: {
    port: 3000                           // --> the port for local dev server
  },

/*!*/  page: {                                // @see /docs/config/page
    title: {                             // --> configuration for page title
      base: 'Codedoc Sample Page',       // --> the base term of page title
      connector: ' | ',                  // --> the connector of different parts of the page title
      extractor: (content, config) =>    // --> the page-specific title extractor
        guessTitle(
          content, 
          config.page.title.base, 
          config.page.title.connector
        ),
    },
    favicon: undefined                   // --> link to your fav icon
    meta: {                              // --> meta tags of each page
      subject: undefined                 // --> the subject meta tag for each page
      description: undefined             // --> description meta tag for each page
      keywords: [],                      // --> a list of SEO keywords
      themeColor: '#212121',             // --> the browser bar color of your docs
      appleMobileWebStatusBarStyle:      // --> same as above, but for iOS Safari
        'black-translucent'
    },
    fonts: {                             // --> font settings
      text: {                            // --> font used for texts
        url:                             // --> URL of font used for texts
          'https://fonts.googleapis.com/css?family=Hind:400,700&display=swap',
        name: 'Hind'                     // --> name of font used for texts
        fallback: 'sans-serif'           // --> the fallback font for texts
      },
      code: {                            // --> font used for codes
        url:                             // --> URL of font used for codes
          'https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400&display=swap',
        name: 'Source Code Pro',         // --> name of the font used for codes
        fallback:                        // --> fallback font for codes
          `'Courier New', Courier, monospace`
      },
      icon: {                            // --> the icon font
        url:                             // --> url of hte icon font (and perhaps the outline icon font)
          'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined',
        name: 'Material Icons',          // --> name of the icon font
        outline:                         // --> name of the outline icon font
          'Material Icons Outlined'
      }
    },
    scripts: [],                         // --> a list of script elements to be added to the head
    stylesheets: [],                     // --> a list of stylesheet elements to be added to the head
    post: [],                            // --> a list of functions for post-processing each generated HTML page
  },

/*!*/  markdown: {                            // @see /docs/config/markdown
    Code,
    Heading,
    customComponents:                    // --> custom components available in markdown
      DefaultMarkdownCustomComponents,   // --> default components provided by codedoc
    customInlineComponents:              // --> custom inline components available in markdown
      DefaultMarkdownCustomInlineComponents
  },
/*!*/  tocMarkdown: {                         // @see /docs/config/markdown
    Heading: ToCHeading,
    customComponents:                    // --> custom components available while parsing toc markdown
      DefaultToCMarkdownCustomComponents,// --> default toc components provided by codedoc
    customInlineComponents:              // --> custom inline components available in toc markdown
      DefaultToCMarkdownCustomInlineComponents
  },
/*!*/  plugins: [],                           // @see /docs/config/plugins
});
```

> :ToCPrevNext