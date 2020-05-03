# Customization

Besides the [theme](/docs/theme) and the [config](/docs/config/overview), you can customize how **CODEDOC** looks
and behaves by using custom layout components. Codedoc uses TSX-based components for all layout elements, and you
can start modifying them simply by changing the content of `.codedoc/content/index.tsx`:

```tsx | .codedoc/content/index.tsx
import { RendererLike } from '@connectv/html';              // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)
import { File } from 'rxline/fs';                           // @see [RxLine](https://github.com/loreanvictor/rxline)
import { Page, Meta, ContentNav, Fonts, ToC, GithubSearch$ } from '@codedoc/core/components'; // --> default layout components from codedoc

import { config } from '../config';                                       // --> configuration of the project
import { Header } from './header';                                        // --> your own header component
import { Footer } from './footer';                                        // --> your own footer component


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}    {/* --> set title based on config */}
          favicon={config.page.favicon}                                  {/* --> set faviocn based on config */}
          meta={<Meta {...config.page.meta}/>}                           {/* --> set meta based on config */}
          fonts={<Fonts {...config.page.fonts}/>}                        {/* --> set fonts based on config */}

          scripts={config.page.scripts}                                  {/* --> add scripts from config */}
          stylesheets={config.page.stylesheets}                          {/* --> add stylesheets from config */}

          header={<Header {...config}/>}                                 {/* --> use the header component */}
          footer={<Footer {...config}/>}                                 {/* --> use the footer component */}
          toc={                                                           // --> the ToC component
            <ToC search={                                                 // --> configure ToC search based on GitHub config
                  config.misc?.github ? 
                  <GithubSearch$
                    repo={config.misc.github.repo} 
                    user={config.misc.github.user}
                    root={config.src.base}
                    pick={config.src.pick.source}
                    drop={config.src.drop.source}
                  /> : false
            }>{toc}</ToC>
          }>
      {_content}                                                         {/* --> display the content of each page */}
      <ContentNav content={_content}/>                                   {/* --> the content nav element */}
    </Page>
  )
}
```

<br>

> [touch_app](:Icon) **NOTE**
>
> Despite the TSX syntax, **CODEDOC** components are not React components. The component library
> used by codedoc is [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh), which is a more
> close-to-DOM-api library for creating JAMStack apps.
>
> > :Buttons
> > > :Button label=Learn More, url=https://github.com/CONNECT-platform/connective-sdh

---

## Overriding Default Layout

As you can see from the code, you can simply create your own custom layout elements and use them
instead of the default ones:

```tsx | .codedoc/content/footer.tsx
import { CodedocConfig } from '@codedoc/core';
import { Footer as _Footer } from '@codedoc/core/components';


export function Footer(config: CodedocConfig, renderer: any) {
  return <_Footer>I prefer an empty footer</_Footer>;
}
```

However, since **CODEDOC**'s default layout elements sometimes have specific interactions
with each other, with codedoc bundle's initialization scripts and generally with codedoc features,
it is a good idea to look at the 
[source code of the default layout component](https://github.com/CONNECT-platform/codedoc/tree/master/src/components) 
you want to override first.

> [warning](:Icon) **WARNING**
>
> Your custom layout elements might not work with codedoc features if some specific properties
> of them are missing. So **DO CHECK** the source of the original layout components before
> writing and using your own custom ones.
>
> > :Buttons
> > > :Button label=Check out the Source Codes, url=https://github.com/CONNECT-platform/codedoc/tree/master/src/components

---

## Recipes

For convenience, recipes for most common customizations are included in these docs. If you however cannot find a
neat solution to the particular customization you have in mind, do not hesitate to ask (for example in our community).
Additionally, if you have your own customization recipe that you think will be useful for other people using **CODEDOCC**,
it would be extremely nice of you if you could [contribute to these docs](https://github.com/CONNECT-platform/codedoc-docs)
and add your recipes!

> :Buttons
> > :Button label=Contribute to the Docs!, url=https://github.com/CONNECT-platform/codedoc-docs

> :ToCPrevNext