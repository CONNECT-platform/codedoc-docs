# Recipe: Custom Search API

For this recipe, we're going to assume that we've got a nice search API
that gives you a JSON array of URLs of matching documentation pages, based on a given
query, and now we want to use it instead of the GitHub search for our docs.

We are assuming that the API, when requested with:

```bash
curl https://my-search.cloud?q=whatever
```

would respond with something like:

```bash
{
  "results": [
    "https://johndoe.github.io/my-project/",
    "https://johndoe.github.io/my-project/docs/stuff",
    "https://johndoe.github.io/my-project/docs/whatever/overview"
  ]
}
```


<br>

## Step 1: The Search Component

Lets create a search component in `.codedoc/content/my-search.tsx`:

```tsx | .codedoc/content/my-search.tsx
import { ajax } from 'rxjs/ajax';
import { Subject, of } from 'rxjs';
import { switchMap, map, catchError, share } from 'rxjs/operators';
import { RendererLike, ComponentThis } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ToCSearchBtn } from '@codedoc/core/components';


export function MySearch(this: ComponentThis, options: SearchOptions, renderer: RendererLike<any, any>) {
  const query = new Subject();
  const prefix = 'https://johndoe.github.io/my-project';

  const results = query.pipe(
    switchMap(q =>
      ajax.getJSON(
        `https://my-search.cloud?q=${encodeURIComponent(q)}`
      ).pipe(catchError(() => of(undefined)))       // --> no sweat in case of error
    ),
    map(res => 
      (res.results || [])
      .map(url => url.substr(prefix.length))        // --> returned URLs must be relative to domain root
    ),
    share(),
  );

  return <ToCSearchBtn label="Search via my-search ..." query={query} results={results}/>;
}


export const MySearch$ = /*#__PURE__*/transport(MySearch);
```

> :Buttons
> > :CopyButton

<br>

> [touch_app](:Icon) **NOTE**
>
> Note that although we have defined the component `MySearch`, we also export
> a _transported_ version of it named `MySearch$`. The reason is `MySearch` is a client-side component,
> i.e. it should be rendered and bound on the browser. However, we want to feed it to the
> rest of our layout components on the server-side, i.e. when we are building the HTML files.
> `MySearch$` basically acts as a placeholder for `MySearch` in server-side code, allowing you
> to include it where you need it. When included, it will cause the code for the client-side component,
> i.e. `MySearch`, to be included in codedoc bundle, alongside an initialization script
> that would render `MySearch` in place of the placeholder on the browser.
>
> > :Buttons
> > > :Button label=Learn More, url=https://github.com/CONNECT-platform/connective-sdh

<br>

## Step 2: Use MySearch

Now lets configure our ToC to use `MySearch$` instead of the default `GithubSearch$` component.
For that purpose, we just need to modify `.codedoc/content/index.tsx`:

```tsx | .codedoc/content/index.tsx
import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
import { Page, Meta, ContentNav, Fonts, ToC } from '@codedoc/core/components';

import { config } from '../config';
import { Header } from './header';
import { Footer } from './footer';
/*!*/import { MySearch$ } from './my-search';            // --> import the component


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
/*!*/            <ToC search={<MySearch$/>}>{toc}</ToC>       // --> give it to ToC for search
          }>
      {_content}
      <ContentNav content={_content}/>
    </Page>
  )
}
```

> :Buttons
> > :CopyButton

> :ToCPrevNext