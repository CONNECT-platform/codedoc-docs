# Entry Files

Entry files are the markdown files that **CODEDOC** reads and transforms to HTML files.
You can configure them via `.codedoc/config.ts`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  src: {
/*!*/    base: 'docs/md',                     // --> the base folder for all markdowns
/*!*/    not_found: '404.md',                 // --> markdown file for 404 page, relative to `base`
/*!*/    toc: '_toc.md',                      // --> markdown file for toc, relative to `base`
/*!*/    pick: /\.md$/,                       // --> which files to pick (default: .md files)
/*!*/    drop: /(^_)|(\/_)/,                  // --> which files to drop (default: _something.md files)
/*!*/  },
  //...
});
```

You can provide any of these properties. Not provided properties will fallback to values
outlined above:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  src: {
/*!*/    base: 'my-markdowns',            // --> read markdowns from `my-markdowns` folder
/*!*/    drop: /(^\.)|(\/\.)/,            // --> drop those who start with a dot
/*!*/  },
  //...
});
```

---

## Base Folder

The base folder is where **CODEDOC** will search for your markdown files. If you have following files:

```bash
my-project/docs/md/index.md
my-project/docs/md/stuff/stuff.md
my-project/docs/wrong-place.md
```

and the following config:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  src: {
    base: 'docs/md',
  },
  //...
});
```

Then the following files will be processed by **CODEDOC**:
- `my-project/docs/md-index.md`
- `my-project/docs/stuff/stuff.md`

And `my-project/docs/wrong-place.md` will be ignored.

> :Buttons
> > :Button label=Overview of How Codedoc Works, url=/docs/overview

---

## ToC File

The table of contents is read from a special markdown file. The address of this file
is configured via `toc` field of entry files configuration:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  src: {
    base: 'docs/md',
/*!*/    toc: '_toc.md',                      // --> toc markdown is on `docs/md/_toc.md`
  },
  //...
});
```

With this configuration, `docs/md/_toc.md` will be loaded and parsed for
filling in the ToC.

> [touch_app](:Icon) **NOTE**
>
> If you customize the address of the table of contents file, make sure to either
> name it to something that starts with `_`, or is located in a folder whose name starts with an `_`,
> or is skipped via your [custom exclusion rule](#including-and-excluding-files). Otherwise a stand-alone HTML file will
> be created for it as well.

---

## Including and Excluding Files

`pick` and `drop` are regular expressions that determine which markdown files
are to be included/excluded. **CODEDOC** will search the `base` folder, select files whose path
(relative to `base`) matches `pick` regex, and from those exclude ones whose path
(relative to `base`) matches `drop` regex. So the following config:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  src: {
    base: 'docs/md',
    pick: /\.md$/,
    drop: /(^_)|(\/_)/,
  },
  //...
});
```

simply means 
- Search through `docs/md`
- Pick files who end in `.md`, 
- Ignore those whose names start with an underline (or are in a folder
whose name starts with an underline).

---

## The 404 Page

`not_found` specifies the markdown to be used for creating a 404 page. The same markdown rules will
be applied to this page as with the rest of the markdown files, it is even processed just like another markdown file.
This setting is used by the local dev server to serve it properly, and can be used by any CI/CD pipeline
to serve the proper html when needed.

Note that you might need to configure your hosting provider to serve this file as well, and this is sometimes
not possible. For example, github will simply serve `404.html`, so the default config will work on GitHub Pages,
but custom configs won't.

> :ToCPrevNext