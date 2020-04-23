# Recipe: Hamburger Menu on Top

For this recipe we want to move the hamburger menu there on desktop,
while keeping it at its current place on mobile phones (since it is more reachable on a phone).

<br>

## Step 1: Create a Top-Left Header

The default **CODEDOC** header sits at the top-right corner of the screen, so lets create a 
left-header component which sits at the top-left and hosts our hamburger menu. Lets create
the file `.codedoc/content/left-header.tsx`:

```tsx | .codedoc/content/left-header.tsx
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme'; // --> for theming
import { CodedocTheme } from '@codedoc/core';                           // --> we want our left-header's style to be compliant with codedoc theme
import { ToCToggle$ } from '@codedoc/core/components';                  // --> this is the hamburger menu


const LeftHeaderStyle = themedStyle((theme: CodedocTheme) => ({         // --> defined a themed-based style
/*!*/  leftHeader: {                                                         // --> styles of the main left-header component
/*!*/    position: 'fixed',
/*!*/    top: 24,
/*!*/    left: 24,
/*!*/    zIndex: 999,                                                        // --> make sure it is above the ToC
/*!*/    '@media screen and (max-width: 1200px)': {                          // --> lets hide it on mobile
/*!*/      '&': { display: 'none' }
/*!*/    },
/*!*/  },
  leftHeaderPadding: {                                                  // --> also a padding element that we'll use to pad ToC to not overlap with the left-header
    height: 80,
    position: 'sticky',                                                 // --> it should stick to the top of ToC
    top: -32,                                                           // --> this is because ToC has a padding by default
    marginTop: -32,
    background: theme.toc.light.background,                             // --> should be of same background as ToC
    'body.dark &': { background: theme.toc.dark.background },           // --> also should share the ToC background in dark mode
    '@media (prefers-color-scheme: dark)': {                            // --> this is for when the page scripts have not yet determined the user preference for dark mode/light mode and the system-settings is being adhered to
      'body:not(.dark-mode-animate) &': {
        background: theme.toc.dark.background,
      }
    },
    'body.dark-mode-animate &': { transition: 'background .3s' },       // --> should animate its dark-mode-dependent properties
    '@media screen and (max-width: 1200px)': {                          // --> also make it go away on mobile.
      '&': { display: 'none' }
    },
  }
}));


/*!*/export function LeftHeader(                                              // --> the main left-header component
/*!*/  this: ThemedComponentThis,
/*!*/  _: any,
/*!*/  renderer: any,
/*!*/) {
/*!*/  const classes = this.theme.classes(LeftHeaderStyle);                   // --> just get the styles resolved based on theme
/*!*/  return <div class={classes.leftHeader}><ToCToggle$/></div>             // --> and return a div
/*!*/}


export function LeftHeaderPadding(                                      // --> the padding element
  this: ThemedComponentThis,
  _: any,
  renderer: any,
) {
  const classes = this.theme.classes(LeftHeaderStyle);
  return <div class={classes.leftHeaderPadding}/>
}
```

The styling used for the components are based on [`@connectv/jss-theme`](https://github.com/CONNECT-platform/connective-jss-theme)
which is in turn based on [JSS](https://cssinjs.org/).

<br>

## Step 2: Add it to Content

To add the left-header to our page, lets modify `.codedoc/content/index.tsx`:

```tsx | .codedoc/content/index.tsx
import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
import { Page, Meta, ContentNav, Fonts, ToC, GithubSearch$ } from '@codedoc/core/components';

import { config } from '../config';
import { Header } from './header';
/*!*/import { LeftHeader, LeftHeaderPadding } from './left-header';          // --> import the left-header and its padding element
import { Footer } from './footer';


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}
          favicon={config.page.favicon}
          meta={<Meta {...config.page.meta}/>}
          fonts={<Fonts {...config.page.fonts}/>}

          scripts={config.page.scripts}
          stylesheets={config.page.stylesheets}

          header={<Header {...config}/>}
          footer={<Footer {...config}/>}
          toc={
            <ToC search={
                  config.misc?.github ? 
                  <GithubSearch$
                    repo={config.misc.github.repo}
                    user={config.misc.github.user}
                    root={config.src.base}
                    pick={config.src.pick.source}
                    drop={config.src.drop.source}
                  /> : false
            }>
/*!*/              <LeftHeaderPadding/>                {/* --> add the padding */}
/*!*/              {toc}                               {/* --> on top of ToC content */}
            </ToC>
          }>
      {_content}
      <ContentNav content={_content}/>
/*!*/      <LeftHeader/>                               {/* --> also add the header itself! */}
    </Page>
  )
}
```

<br>

## Step 3: Remove from Footer

Now lets remove the previous hamburger menu from the footer. For this purpose, lets modify contents
of `.codedoc/content/footer.tsx` and create our own custom footer component:

```tsx | .codedoc/content/footer.tsx
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme';
import { CodedocConfig, CodedocTheme } from '@codedoc/core';
import { FooterStyle, DarkModeSwitch$, ToCToggle$ } from '@codedoc/core/components';


/*!*/const _FooterStyle = themedStyle((theme: CodedocTheme) => {
/*!*/  const parent = FooterStyle.style(theme);                     // --> get the style for original footer
/*!*/  return {
/*!*/    footer: {
/*!*/      extend: parent.footer,                                   // --> simply extend them
/*!*/      '@media screen and (min-width: 1200px)': {               // --> and make the left corner of the footer disappear on desktops
/*!*/        '& .left': { opacity: 0 },
/*!*/      },
/*!*/    }
/*!*/  } as any;
/*!*/});


export function Footer(
  this: ThemedComponentThis,
  config: CodedocConfig, 
  renderer: any
) {
  const classes = this.theme.classes(_FooterStyle);

  return <div class={classes.footer}>
/*!*/    <div class="left"><ToCToggle$/></div>                          {/* --> the toggle is included, but hidden on desktop via css */}
    <div class="main">
      <div class="inside">
      <a href={`https://github.com/${config.misc?.github?.user}/${config.misc?.github?.repo}/`}
                target="_blank">GitHub</a>
      </div>
    </div>
    <div class="right"><DarkModeSwitch$/></div>                    {/* --> also do not forget the dark mode switch. */}
  </div>
}
```
<br>

> Notice how for this recipe we adopted the [original code of **CODEDOC**'s own footer](https://github.com/CONNECT-platform/codedoc/blob/master/src/components/page/footer/index.tsx).


> :ToCPrevNext