# Buttons

You can add buttons to your markdown like this:

```md
> :Buttons
> > :Button label=GitHub, url=https://github.com
```

> :Buttons
> > :Button label=GitHub, url=https://github.com

You can have multiple buttons in a row:

```md
> :Buttons
> > :Button label=GitHub, url=https://github.com
>
> > :Button label=NPM, url=https://npmjs.org
```

> :Buttons
> > :Button label=GitHub, url=https://github.com
>
> > :Button label=NPM, url=https://npmjs.org

---

## Icon Buttons

You can have icons on your buttons:

```md
> :Buttons
> > :Button icon=true, label=code, url=https://github.com
>
> > :Button label=NPM, url=https://npmjs.org
```

> :Buttons
> > :Button icon=true, label=code, url=https://github.com
>
> > :Button label=NPM, url=https://npmjs.org

The icons are read from the configured icon-font, which is by default
[Material Icons](https://material.io/resources/icons/?style=baseline). You can override
this in `.codedoc/config.ts` as well:

```ts | .codedoc/config.ts
// ...
export const config = /*#__PURE__*/configuration({
  // ...
  page: {
    // ...
    fonts: {
      // ...
      icon: {
        name: 'My-Icon-Font',                                      // --> name of the icon-font
        url: 'https://some-where-on-the.cloud/fonts/my-icon-font', // --> the URL of the icon-font
      }
    },
    // ...
  },
  // ...
});
```

---

## Copy Button


There is a special `CopyButton` component, that when placed after a code snippet, will copy
the whole contents of the code snippet:

```md
> :Buttons
> > :CopyButton
```

> :Buttons
> > :CopyButton

The copy button by default reads the value `filter_none` from the icon-font. If you
want to use a custom icon-font, you should either make sure that it has a `filter_none` icon
that looks like a copy icon, or that you provide your own custom `CopyButton` component:

> :Tabs
> > :Tab title=component code
> > ```tsx | .codedoc/components/copy-button.tsx
> > import { RendererLike } from '@connectv/html';
> > import { Button } from '@codedoc/core/components';
> >
> >
> > export function CopyButton(_: any, renderer: RendererLike<any, any>) {
> >   return <Button icon='true' onclick='smartCopy(this)' label='icon-copy'/>;
> >}
> >```
> > > :Buttons
> > > > :CopyButton
>
> > :Tab title=config
> > ```ts | .codedoc/config.ts
> >import { configuration, DefaultMarkdownCustomComponents } from '@codedoc/core';
> >
> >import { theme } from './theme';
> >import { CopyButton } from './components/copy-button';
> >
> >
> >export const config = /*#__PURE__*/configuration({
> >  // ...
> >/*!*/  markdown: {
> >/*!*/    customComponents: {
> >/*!*/      ...DefaultMarkdownCustomComponents,
> >/*!*/      CopyButton,
> >/*!*/    }
> >/*!*/  },
> >  // ...
> >});
> >```
> > > :Buttons
> > > > :CopyButton

[Read here](/docs/markdown/overview/#custom-components) for more details on creating custom markdown components in codedoc.

> :ToCPrevNext