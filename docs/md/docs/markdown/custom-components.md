# Custom Components

Lets create a simple `Card` component
and add it to our markdowns. Let's first create the two following files:

```bash
.codedoc/components/card/index.tsx             # --> main component code
.codedoc/components/card/style.ts              # --> component styles
```

<br>

## Component Code

Codedoc uses [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh) for its
component system, alongside [CONNECTIVE JSS themes](https://github.com/CONNECT-platform/connective-jss-theme)
for theming (which is in turn based on [JSS](https://cssinjs.org)). As a result, a simple
cards document would look like this:

> :Tabs
> > :Tab title=index.tsx
> > ```tsx | .codedoc/components/card/index.tsx
> > import { ThemedComponentThis } from '@connectv/jss-theme';  // @see [CONNECTIVE JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme)
> > import { RendererLike } from '@connectv/html';              // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)
> > import { CodedocTheme } from '@codedoc/core';               // --> Type helper for theme object
> > 
> > import { CardStyle } from './style';                        // @see tab:style.ts
> > 
> > 
> > export interface CardOptions {                              // --> a nice interface for possible props
> >   raise: string;                                            // --> which is the raise level of our cards. Note that all props MUST be of type `string`
> > }
> > 
> > 
> > export function Card(
> >   this: ThemedComponentThis,                                // --> keep typescript strict typing happy
> >   options: CardOptions,                                     // --> the component props (attributes)
> >   renderer: RendererLike<any, any>,                         // --> our beloved renderer
> >   content: any,                                             // --> the content of the component
> > ) {
> >   const classes = this.theme.classes(CardStyle);            // --> fetch the theme-based classes
> >   let raise = 'raised-0';
> >   if (options && options.raise === '1') raise = 'raised-1'; // --> determine the proper raise level based on given attributes
> >   if (options && options.raise === '2') raise = 'raised-2';
> > 
> >   return <div class={`${classes.card} ${raise}`}>
> >     {content}
> >   </div>;
> > }
> > ```
> > > :Buttons
> > > > :CopyButton
>
> > :Tab title=style.ts
> > ```ts | .codedoc/components/card/style.ts
> > import { themedStyle } from '@connectv/jss-theme';  // @see [Connective JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme)
> > import { CodedocTheme } from '@codedoc/core';
> >
> >
> > export const CardStyle = themedStyle<CodedocTheme>(theme => ({
> > card: {
> >    display: 'inline-block',
> >    verticalAlign: 'middle',
> >    borderRadius: 8,
> >    padding: 8,
> >    maxWidth: 320,
> >    margin: 16,
> >    overflow: 'hidden',
> >    cursor: 'pointer',
> >    transition: 'box-shadow .3s, transform .3s',
> >
> >    '&.raised-0': { boxShadow: '0 1px 3px rgba(0, 0, 0, .12)' },  // --> different styles for different raise-levels
> >    '&.raised-1': { boxShadow: '0 3px 6px rgba(0, 0, 0, .18)' },
> >    '&.raised-2': { boxShadow: '0 6px 18px rgba(0, 0, 0, .25)' },
> >    '&:hover': {
> >      boxShadow: '0 6px 18px rgba(0, 0, 0, .25)',
> >      transform: 'translateY(-8px)'
> >    },
> >
> >    '& img': {
> >      margin: -8,
> >      marginTop: -24,
> >      width: 'calc(100% + 16px)',
> >      maxWidth: 'none',
> >    },
> >
> >    '& strong': {
> >      fontSize: 18,
> >      display: 'block',
> >      color: theme.light.primary,                               // --> so lets make the title's of the primary color
> >      'body.dark &': { color: theme.dark.primary },             // --> but also do respect dark-mode settings
> >      '@media (prefers-color-scheme: dark)': {                  // --> this is to ensure proper dark-mode colors even before the scripts are loaded and user overrides are fetched
> >        'body:not(.dark-mode-animate) &': {
> >          color: theme.dark.primary,
> >        },
> >      },
> >    },
> >  }
> >}));
> > ```
> > > :Buttons
> > > > :CopyButton

<br>

## Configuration

To add this card component to our codedoc config, lets modify `.codedoc/config.ts` like this:

```ts | .codedoc/config.ts

import { 
  configuration, 
/*!*/  DefaultMarkdownCustomComponents              // --> make sure to import the default components
} from '@codedoc/core';

import { theme } from './theme';
/*!*/import { Card } from './components/card';      // --> import the card component itself


export const config = /*#__PURE__*/configuration({
  // ...
/*!*/  markdown: {                                  // --> update markdown config
/*!*/    customComponents: {                        // --> add to custom components
/*!*/      ...DefaultMarkdownCustomComponents,      // --> make sure to add default markdown components. otherwise the default components will not work!
/*!*/      Card,                                    // --> add our own card component
/*!*/    }
/*!*/  },
  // ...
});
```

<br>

## Using The Component

Now we can use our card component in our markdown files:

```md | some-doc.md
> :Card
>
> ![Card Hero](https://i.etsystatic.com/14457190/r/il/3cb8ff/1676245710/il_570xN.1676245710_ba0u.jpg)
>
> **Banksy**
> Banksy is an anonymous England-based street artist, vandal, political activist, and film director, active since the 1990s. 
> His satirical street art and subversive epigrams combine dark humour with graffiti executed in a distinctive stenciling technique.
> > :Buttons
> > > :Button label=Wiki, url=https://en.wikipedia.org/wiki/Banksy

> :Card raise=1
>
> ![Card Hero](https://www.tate.org.uk/art/images/work/T/T00/T00384_9.jpg)
>
> **Jackson Pollock**
> Paul Jackson Pollock was an American painter and a major figure in the abstract expressionist movement. 
> He was widely noticed for his technique of pouring or splashing liquid household paint onto a horizontal surface, 
> enabling him to view and paint his canvases from all angles
> > :Buttons
> > > :Button label=Wiki, url=https://en.wikipedia.org/wiki/Jackson_Pollock
```

> :Card
>
> ![Card Hero](https://i.etsystatic.com/14457190/r/il/3cb8ff/1676245710/il_570xN.1676245710_ba0u.jpg)
>
> **Banksy**
> Banksy is an anonymous England-based street artist, vandal, political activist, and film director, active since the 1990s. 
> His satirical street art and subversive epigrams combine dark humour with graffiti executed in a distinctive stenciling technique.
> > :Buttons
> > > :Button label=Wiki, url=https://en.wikipedia.org/wiki/Banksy

> :Card raise=1
>
> ![Card Hero](https://www.tate.org.uk/art/images/work/T/T00/T00384_9.jpg)
>
> **Jackson Pollock**
> Paul Jackson Pollock was an American painter and a major figure in the abstract expressionist movement. 
> He was widely noticed for his technique of pouring or splashing liquid household paint onto a horizontal surface, 
> enabling him to view and paint his canvases from all angles
> > :Buttons
> > > :Button label=Wiki, url=https://en.wikipedia.org/wiki/Jackson_Pollock

---

# Custom Inline Components

You can similarly create your own inline custom components:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | .codedoc/components/tag/index.tsx
> > import { ThemedComponentThis } from '@connectv/jss-theme';
> > import { RendererLike } from '@connectv/html';
> > import { CodedocTheme } from '@codedoc/core';
> > 
> > import { TagStyle } from './style';            // @see tab:Style Code
> > 
> > 
> > export function Tag(
> >   this: ThemedComponentThis<CodedocTheme>,
> >   _: any,
> >   renderer: RendererLike<any, any>,
> >   content: any
> > ) {
> >   const classes = this.theme.classes(TagStyle);
> >   return <span class={classes.tag}># {content}</span>
> > }
> > ```
>
> > :Tab title=Style Code
> > ```ts | .codedoc/components/tag/style.ts
> > import { themedStyle } from '@connectv/jss-theme';
> > import { CodedocTheme } from '@codedoc/core';
> > 
> > 
> > export const TagStyle = themedStyle<CodedocTheme>(theme => ({
> >   tag: {
> >     display: 'inline-flex',
> >     alignItems: 'center',
> >     verticalAlign: 'middle',
> >     height: 16,
> >     borderRadius: 16,
> >     padding: 8,
> >     background: theme.light.primary,
> >     color: theme.light.primaryContrast,
> > 
> >     'body.dark &': { 
> >       background: theme.dark.primary,
> >       color: theme.dark.primaryContrast,
> >     },
> >   }
> > }));
> > ```
>
> > :Tab title=Config
> > ```ts | .codedoc/config.ts
> > import { 
> >   configuration, 
> > /*!*/  DefaultMarkdownCustomInlineComponents         // --> make sure to import the default components
> > } from '@codedoc/core';
> > 
> > import { theme } from './theme';
> > /*!*/import { Tag } from './components/tag';         // --> import the tag component itself
> > 
> > 
> > export const config = /*#__PURE__*/configuration({
> >   // ...
> > /*!*/  markdown: {                                   // --> update markdown config
> > /*!*/    customInlineComponents: {                   // --> add to custom components
> > /*!*/      ...DefaultMarkdownInlineCustomComponents, // --> make sure to add default markdown components. otherwise the default components will not work!
> > /*!*/      Tag,                                      // --> add our own tag component
> > /*!*/    }
> > /*!*/  },
> >   // ...
> > });
> > ```

Which can be used like this:

> :Tabs
> > :Tab title=Markdown
> > ```md | docs/md/some-doc.md
> > <!-- ... -->
> > And now lets use [Some Tags](:Tag) inside our text.
> > <!-- ... -->
> > ```
>
> > :Tab title=How it Looks
> >
> > And now lets use [Some Tags](:Tag) inside our text.

> :ToCPrevNext