# Page Configuration

Page configuration determines properties of each generated HTML page. You can
change this configuration via `.codedoc/config.ts`:


```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
import { guessTitle } from '@codedoc/core/transport';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
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
  //...
});
```

You can provide any of these properties. Properties not provided will fallback
to values outline above:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    title: {
      base: 'My Project',
      connector: ' > ',
    },
    favicon: '/favicon.ico'
    meta: {
      subject: 'An Awesome Project'
      description: 'Pure awsomeness that helps you become awsome as well'
      keywords: ['project', 'meine', 'awesome'],
    },
  },
  //...
});
```

---

## Page Title

The `title` property determines the title of each page. It has three components:

- **Base**\
  Denoted by `base` property, is the base title for all of your docs, e.g. `"My Project"`

- **Connector**\
  Denoted by `connector` property, is used to connect the `base` to page-specific part of the title. For example,
  if you have titles like `My Project > Stuff`, then `" > "` is your connector

- **Extractor**\
  Denoted by `extractor` property, is a function that determines the final page-specific title,
  based on the HTML content, codedoc configuration and the markdown file.

So for example the following configuration:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    title: {
      base: 'My Project',
      connector: ' > ',
/*!*/      extractor: (_, config, file) => 
/*!*/        [
/*!*/          config.page.title.base,
/*!*/          ...file.path.substr(0, file.path.length - 3)         // --> remove the extension
/*!*/            .split('/')                                        // --> split by slash
/*!*/            .map(_ => _[0].toUpperCase() + _.substr(1))        // --> camel case each part
/*!*/        ].join(config.page.title.connector)                    // --> join by the connector
    },
    //...
  },
  //...
});
```

would create the following titles for these markdown files:

```
my-project/docs/md/index.md -------------------> My Project > Index
my-project/docs/md/whatever/stuff.md ----------> My Project > Whatever > Stuff
```

The default extractor function is `guessTitle()`, which will assume the content of the
first heading of the markdown file as the title of the corresponding page. So for a page like this:

```md | docs/md/whatever/stuff.md
![banner](/banner.svg)

# Whatevs!
Hellow, and whatever.
```

the title would become `My Project > Whatevs!`.

---

## Meta

You can configure the meta tags of each page via the `meta` property:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    // ...
    meta: {
      subject: 'An Awesome Project'
      description: 'Pure awsomeness that helps you become awsome as well',
      keywords: ['project', 'meine', 'awesome'],
/*!*/      themeColor: '#212121',                      // @see [Google's docs](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)
/*!*/      appleMobileWebStatusBarStyle: 'black-translucent'             // @see [Apple's docs](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
    },
    // ...
  },
  //...
});
```

It is highly recommended to set `subject`, `description` and `keywords` tags since these meta tags
are pretty important for search engine indexing.

> [touch_app](:Icon) **NOTICE**
>
> You can also provide page-specific meta information for `subject`, `description` and `keywords`
> properties using `MetaOverride` markdown component.
>
> > :Buttons
> > > :Button label=Learn More, url=/docs/markdown/meta-override

---

## Favicon

The `favicon` property names the URL of your doc's fav icon. For the default setup, it is recommended
to keep this file in the root of your project, named `favicon.ico`, and setting the favicon to `/favicon.ico`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    // ...
/*!*/    favicon: '/favicon.ico',
    // ...
  },
  //...
});
```

> :Buttons
> > :Button label=Read More about Images and Assets, url=/docs/assets-and-images

## Fonts

You can configure the fonts via `fonts` property:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    //...
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
      }
    },
  },
  //...
});
```

For example, changing the text font to _Comic Neue_ would look like this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    //...
    fonts: {
      text: {
        url:
          'https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
        name: 'Comic Neue'
        fallback: 'cursive'
      },
    },
  },
  //...
});
```

Similarly, you could override the `code` property to change the font used for code snippets and in-line codes.

<br>

### Icon Font

You can also modify the icon font using `icon` property:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    //...
    fonts: {
      icon: {
        url: '<URL to my icon font and optionally its outline version>'
        name: '<Name of the icon font>'
        outline: '<Name of the outline icon font>'       // --> if not provided, this will default to `<name> Outlined`
      },
    },
  },
  //...
});
```

<br>

> <span class="icon-font" style="vertical-align: sub; color: #ffa41b">warning</span>
> <span style="color:#ffa41b">**CAUTION**</span>
> <span class="icon-font" style="vertical-align: sub; color: #ffa41b">warning</span>
>
> When providing an icon font, you **MUST ENSURE IT HAS THE GLYPHS THAT ARE USED BY CODEDOC BY DEFAULT**.
> The following glyphs are used by codedoc:
> - **wb_incandescent**
> - **touch_app**
> - **chevron_right**
> - **chevron_left**
> - **link**
> - **open_in_new**
> - **close**
> - **arrow_back_ios**
> - **arrow_forward_ios**
> - **search**
> - **list**
> - **filter_none**
>
> If all these glyphs are not provided by the icon-font, then some features of **CODEDOC** will appear
> pretty broken (since the icon font will be missing). You can take a look at [Material Icons](https://material.io/resources/icons/)
> to see how each of these icons should look. The safest approach would be to import all the SVGs from Material Icons
> into your icon font and override those who you want to.

---

## Scripts and Stylesheets

You can add custom script and stylesheets to each page via `scripts` and `stylesheets` properties.
For example, imagine you want to add google analytics to your docs:

**STEP 1**\
Rename `.codedoc/config.ts` to `.codedoc/config.tsx` so that we can easily create the necessary script elements using TSX.

**STEP 2**\
Then, modify `.codedoc/config.tsx` like this:

```tsx | .codedoc/config.tsx
import { configuration } from '@codedoc/core';
/*!*/import { StaticRenderer } from '@connectv/sdh';    // --> import a static renderer for easily creating the script elements
/*!*/import register from 'jsdom-global';               // --> also lets create a global document object for that purpose

/*!*/const renderer = new StaticRenderer();             // --> initialize renderer
/*!*/register();                                        // --> register global document object

// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    // ...
/*!*/    scripts: [
/*!*/      <script>{`
/*!*/      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
/*!*/      ga('create', 'UA-XXXXX-Y', 'auto');
/*!*/      ga('send', 'pageview');
/*!*/      `}</script>,
/*!*/      <script async src='https://www.google-analytics.com/analytics.js'/>
    ]
  },
  //...
});
```

<br>

> [touch_app](:Icon) **NOTE**
>
> Note that members of `scripts` and `stylesheets` must be `HTMLElement`s. This is why
> we used TSX, alongside the TSX renderer of [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh)
> for creating them in the exmaple above.

---

## Post Processing

You can conduct post-processing on generated HTMLs before they are saved to disk via `post` property.
This property should be an array of post-processor functions, each of which will be applied to each
HTML document before it is stored on the filesystem.

Each post-processor will be passed an `HTMLDocument` object as its first argument and a `File` object
as its second argument, whose `.path` property is the path the HTML file is going to be stored on (relative
to the base HTML output folder).

So for example the following configuration:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  page: {
    //...
/*!*/    post: [
/*!*/      (html, file) => {
/*!*/        html.body.setAttribute('data-path', file.path);
/*!*/      }
/*!*/    ]
  },
  //...
});
```

Will set the path of the source markdown file on the `data-path` attribute of `body`.

Post processor functions are executed in the order provided, after **CODEDOC** itself
has conducted its own post-processing (adding necessary script and stylesheet imports, 
fixing local links according to [project namespace](/docs/config/output#project-namespace)).
They can be asynchronous functions, in which case each will block the queue until it is resolved.


> :ToCPrevNext