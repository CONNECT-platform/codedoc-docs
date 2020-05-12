# Plugins

Plugins in **CODEDOC** are basically configuration helpers, filling in the gaps of your project's configuration.
They can add custom markdown components, init scripts to your bundle or HTML post processors, which makes them powerful
tools in adding to the feature-set of your documentation project.

---

## Adding Plugins

You can simply add plugins by adding them to `plugins` list in your config in `.codedoc/config.ts`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
/*!*/import { formulaPlugin } from '@codedoc/core/components';

// ...

export const config = /*#__PURE__*/configuration({
  // ...
/*!*/  plugins: [
/*!*/    // ...
/*!*/    formulaPlugin
/*!*/  ],
  // ...
});
```

---

## Priority of Plugins

Each plugin basically is a function that provides some additional configuration for your project.
A plugin **CANNOT** override already defined configuration values, it can merely provide something
that is not defined. This is to ensure that you have full explicit control over your project's
configuration, and to avoid situations where you configure something manually but don't see its
effect because some plugin is sneakily overriding it.

This priority rule also applies to plugins themselves, so a plugin that comes earlier in the `plugins`
list basically gets priority over plugins that come later.

The following properties are an exception to this rule. All of these config properties are
_arrays_, and value provided by any plugin for them will be concatenated with the value provided directly
in `.codedoc/config.ts`:

- [`bundle.init`](/docs/config/bundle)
- [`page.meta.keywords`](/docs/config/page#meta)
- [`page.scripts`](/docs/config/page#scripts-and-stylesheets)
- [`page.stylesheets`](/docs/config/page#scripts-and-stylesheets)
- [`page.post`](/docs/config/page#post-processing)

Additionally, the following _dictionary_ values will also be aggregated amongst all values provided
by plugins and values defined directly in `.codedoc/config.ts`, though in case of colliding keys, the same
priority rule applies (`.codedoc/config.ts` takes priority, then any plugin that comes first):

- [`markdown.customComponents`](/docs/config/markdown#custom-components)
- [`markdown.customInlineComponents`](/docs/config/markdown#custom-components)
- [`tocMarkdown.customComponents`](/docs/config/markdown#toc-markdown)
- [`tocMarkdown.customInlineComponents`](/docs/config/markdown#toc-markdown)

This basically allows plugins to provide their own custom markdown components, but still ensuring you
can override any particular component provided by any plugin via `.codedoc/config.ts`.

---

## Writing a Plugin

It is super easy to write your own plugin. For example, imagine you would want to create
a Google Analytics plugin:

```tsx | ga-plugin.tsx
import { StaticRenderer } from '@connectv/sdh';
import register from 'jsdom-global';
/*!*/import { ConfigOverride } from '@codedoc/core';

const renderer = new StaticRenderer();                   // --> create a static renderer
register();                                              // --> register jdom global so that we can create DOM elements


/*!*/export function googleAnalytics(gacode: string) {
/*!*/  return function(): ConfigOverride {
/*!*/    return {
/*!*/      page: {
/*!*/        scripts: [
/*!*/          <script>{`
/*!*/          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
/*!*/          ga('create', 'UA-${gacode}-Y', 'auto');
/*!*/          ga('send', 'pageview');
/*!*/          `}</script>,
/*!*/          <script async src='https://www.google-analytics.com/analytics.js'/>
/*!*/        ]
/*!*/      }
/*!*/    }
/*!*/  };
/*!*/}
```

> :Buttons
> > :CopyButton


This simple plugin just adds two scripts to each page, which is how you should add Google Analytics
to any webpage. To consume it, you would simply do this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
/*!*/import { googleAnalytics } from 'ga-plugin';

// ...

export const config = /*#__PURE__*/configuration({
  // ...
/*!*/  plugins: [
/*!*/    // ...
/*!*/    googleAnalytics('XXXX')             // --> your google analytics ID goes here
/*!*/  ],
  // ...
});
```

For a more involved example, lets take a look at the actual code of `formulaPlugin`, which
enables TeX formulas in **CODEDOC**:

```ts | src/components/formula/plugin.ts
import { ConfigOverride } from '../../config/override.type';

import { Formula } from './component';                   // --> get the formula component
import { InlineFormula } from './inline';                // --> get the inline-formula component
import { enableFormula } from './post';                  // --> get the post-processor adding necessary styles and scripts
import { zoomOnFormula$ } from './zoom-on-formula';      // --> get the bundle script that enables zooming on formulas


export function formulaPlugin(): ConfigOverride {
  return {
    markdown: {
      customComponents: { Formula },                     // --> add formula component
      customInlineComponents: { Formula: InlineFormula } // --> add formula inline component
    },
    tocMarkdown: {
      customComponents: { Formula },                     // --> add formula component to ToC (b/c why not)
      customInlineComponents: { Formula: InlineFormula } // --> add formula inline component to ToC
    },
    page: {
      post: [enableFormula]                              // --> add the post-processor
    },
    bundle: {
      init: [zoomOnFormula$]                             // --> add the bundle script
    }
  }
}
```

> :ToCPrevNext