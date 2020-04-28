# Overview

A **CODEDOC** project consists of three main components:
- Some markdown files, which codedoc will search through and transform into HTML files. Codedoc expects to find
these _source_ or _input_ or _entry_ files by default in `docs/md`, though you can reconfigure that.

- The resulting HTML files, alongside the bundle and styles required by those HTML files. Codedoc creates a stand-alone
HTML file for each of your _entry_ markdown files (except those who are exempt by [exclusion rules](#exclusions)) 
and puts them in some destination folder, which is by default the root folder of your project, maintaining
their relative paths to each other. You can reconfigure this destination folder as well.

- Codedoc configruations, scripts and components. These are **ALWAYS** located in `.codedoc/` folder of your project.

Assume you have the following markdown files:

```bash
docs/md/some-folder/overview.md
docs/md/some-folder/spec.md
docs/md/index.md
```

Then, in order to build them, you need to run
```bash
codedoc build
```

And following HTML files will be generated:

```bash
some-folder/overview.html
some-folder/spec.html
index.html
```

You can change the default source and destination folders by modifying `.codedoc/config.ts`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
/*!*/  src: {                       // --> configure source files
/*!*/    base: 'src/markdowns'      // --> base the source to `src/markdowns`
/*!*/  },
/*!*/  dest: {                      // --> configure destination files
/*!*/    html: 'dist/html'          // --> base the destination of htmls to `dist/html`
/*!*/  },
  page: {
    title: {
      base: 'My Project'
    },
  },
});
```

With this configuration, the following list of markdown files:

```bash
src/markdowns/whatever/stuff.md
src/markdowns/whatever/other-stuff.md
src/markdowns/index.md
```

would be transformed to following HTML files:

```bash
dist/html/whatever/stuff.html
dist/html/whatever/other-stuff.html
dist/html/index.html
```

<br>

> <span class="icon-font" style="vertical-align: sub">warning</span> **WARNING**
>
> The default configuration for destination files is optimized for publishing to GitHub Pages.
> If you do intend to publish to GitHub Pages, modify them only if you know what you are doing.

## Exclusions

By default, markdown files whose name starts with `_` or are located in a folder starting with `_`
will be excluded from transformation. This feature is useful for having markdown files that are
to be somehow incorporated in other docs instead of being transformed into stand-alone HTML files.

You can override this config via `.codedoc/config.ts` as well:

```ts | .codedoc/config.ts
export const config = /*#__PURE__*/configuration({
  // ...
  src: {
    base: 'src/markdowns'
/*!*/    drop: /(^\.)|(\/\.)/        // --> exclude files and folders whose name starts with a `.`
  },
  // ...
});
```

---

# Table of Contents

The table of contents, which is accessible via the <span class="icon-font" style="vertical-align:middle">menu</span> icon
on the footer by default, is also read from a markdown file. This special markdown file is by default located
on `docs/md/_toc.md`, though you can change that in `.codedoc/config.ts` as well:

```ts | .codedoc/config.ts
export const config = /*#__PURE__*/configuration({
  // ...
  src: {
    base: 'src/markdowns'
/*!*/    toc: 'stuff/_le_table.md'        // --> now ToC is read from `src/markdowns/stuff/_le_table.md`
  },
  // ...
});
```

<br>

> <span class="icon-font" style="vertical-align: sub">touch_app</span> **NOTE**
>
> If you customize the address of the table of contents file, make sure to either
> name it to something that starts with `_`, or is located in a folder whose name starts with an `_`,
> or is skipped via your [custom exclusion rule](#exclusions). Otherwise a stand-alone HTML file will
> be created for it as well.

<br>

The contents of a ToC markdown file typically looks something like this:

```md | docs/_toc.md
[Home](/)
[Overview](/some-folder/overview)
[Spec](/some-folder/spec)
```

As you can see, for linking to other documents, you simply need to use their path relative
to the base source folder as an absolute URL. This is not exclusive to the table of contents either,
so you can link to any document from any document via the same rule.

Though links are styled a bit differently in the table of contens, you can still add your own
custom content (for example add some text and a button for donations):

```md | docs/_toc.md
[Home](/)
[Stuff](/some-folder/overview)
[Other Stuff](/some-folder/spec)

---

This project relies on donations for maintenance and stuff. Help us out
if you enjoy using it!

> :Buttons
> > :Button label=DONATE, url=opencollective.com/johndoe
```

You can also use the `Collapse` component for organizing long tables of contents:

```md | docs/_toc.md
[Home](/)

> :Collapse label=Stuff
>
> [Overview](/some-folder/overview)
> [Spec](/some-folder/spec)
```

Or use `Collapse` in a nested manner:

```md | docs/_toc.md
[Home](/)

> :Collapse label=Stuff
>
> [Overview](/some-folder/overview)
> > :Collapse label=Spec
> > [Spec Overview](/some-folder/spec/overview)
> > [Spec of This](/some-folder/spec/this)
```

<br>

> :Buttons
> > :Button label=Read More about Collapse, url=/docs/markdown/collapse

<br>

If you want to have the nice _Previous_ and _Next_ buttons in a page
automatically deduced using the ToC, you need to use the `ToCPrevNext` component:

```md | docs/md/some-folder/overview.md

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
mollit anim id est laborum.

/*!*/ > :ToCPrevNext
```

---

# Header

The header of each page is generated using a TSX-based component located in `.codedoc/content/header.tsx`:

```tsx | .codedoc/content/header.tsx
import { CodedocConfig } from '@codedoc/core';
import { Header as _Header, GithubButton, Watermark } from '@codedoc/core/components';


export function Header(config: CodedocConfig, renderer: any) {
  return (
    <_Header>{config.misc?.github ?
      <fragment>
        <GithubButton action={config.misc.github.action || 'Star'}       {/* --> show a github button in the header if github is configured.*/}
          repo={config.misc.github.repo}
          user={config.misc.github.user}
          large={config.misc.github.large === true}
          count={config.misc.github.count !== false}
          standardIcon={config.misc.github.standardIcon !== false}/>
        <br/><br/>
      </fragment>
      : ''}
/*!*/      <Watermark/>                                                      {/* --> show the CODEDOC watermark. */ }
    </_Header>
  )
}
```

So for example by commenting out the highlighted line, you can take out the **CODEDOC** watermark.

These TSX-based components are in fact [**CONNECTIVE SDH**](https://github.com/CONNECT-platform/connective-sdh)
components, so checkout those docs if you want to confidently further customize them.

---

# Footer

Similar to the header, the footer is a TSX-based component (a [**CONNECTIVE SDH**](https://github.com/CONNECT-platform/connective-sdh) component)
located in `.codedoc/content/footer.tsx`:

```tsx | .codedoc/content/footer.tsx
import { CodedocConfig } from '@codedoc/core';
import { Footer as _Footer, GitterToggle$, Watermark} from '@codedoc/core/components';


export function Footer(config: CodedocConfig, renderer: any) {
  let github$;
  if (config.misc?.github)
    github$ = <a href={`https://github.com/${config.misc.github.user}/${config.misc.github.repo}/`} 
                target="_blank">GitHub</a>;                          // --> if github is configured, show a link to the repo in footer

  let community$;
  if (config.misc?.gitter)
    community$ = <GitterToggle$ room={config.misc.gitter.room}/>     // --> if gitter is configured, add its integration

  if (github$ && community$) return <_Footer>{github$}<hr/>{community$}</_Footer>;
  else if (github$) return <_Footer>{github$}</_Footer>;
  else if (community$) return <_Footer>{community$}</_Footer>;
  else return <_Footer><Watermark/></_Footer>;                       // --> if neither github nor gitter are configured, show the watermark.
}
```

So for example we could just change the content of the footer to a link to our
repo's GitHub page, a link to its NPM package, and a link to its twitter page:

```tsx | .codedoc/content/footer.tsx
import { CodedocConfig } from '@codedoc/core';
import { Footer as _Footer } from '@codedoc/core/components';


export function Footer(_: any, renderer: any) {
/*!*/  return <_Footer>
/*!*/    <a href="https://github.com/CONNECT-platform/codedoc">GitHub</a>  {/* --> link to github*/}
/*!*/    <hr/>
/*!*/    <a href="https://www.npmjs.com/package/@codedoc/core">NPM</a>     {/* --> link to NPM*/}
/*!*/    <hr/>
/*!*/    <a href="https://twitter.com/CONNECT_pltfrm">Twitter</a>          {/* --> link to twitter*/}
/*!*/  </_Footer>;
}
```

> :ToCPrevNext