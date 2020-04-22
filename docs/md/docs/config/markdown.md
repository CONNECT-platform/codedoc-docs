# Markdown Config

The `markdown` config determines which components are to be used
for which markdown elements. For example, you can provide your own
custom heading component:

```tsx | .codedoc/components/heading.tsx
import { RendererLike } from '@connectv/html';
import { HeadingOptions } from '@codedoc/core/components';


export function Heading(options: HeadingOptions, renderer: RendererLike<any, any>, content: any) {
  return <h1 id={options.slug}># {content}</h1>          // --> all headings are H1s, and they start with a #
}
```
```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';

/*!*/import { Heading } from './components/heading';

//...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  markdown: {
/*!*/    Heading,             // --> use your custom heading instead of the default heading component
/*!*/  }
  //...
});
```

**CODEDOC** uses [`@connectv/marked`](https://github.com/CONNECT-platform/marked) for transforming
markdowns to HTML, which is how you can use TSX-based components in place of standard markdown structures
like headings.

> :Buttons
> > :Button label=Learn More, url=https://github.com/CONNECT-platform/marked

---

## Custom Components

`@connectv/marked` also supports custom components, i.e. TSX-components for user-defined non-standard markdown
structures. This is how **CODEDOC**'s enhanced features like buttons and tabs work. You can also provide
your own custom components and use them in your markdown files.

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/custom-components

---

## ToC Markdown

**CODEDOC** uses a separate configuration for parsing the ToC markdown file, designated via the `tocMarkdown` config.
This allows for having ToC specific components and structures. If you need to override the standard markdown
elements of your ToC or need to add custom components just for use in the ToC, simply add them to `tocMarkdown` property
instead of `markdown` property.


> :ToCPrevNext