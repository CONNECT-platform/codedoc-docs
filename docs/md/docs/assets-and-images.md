# Images and Assets

You most probably want to have some images, scripts, stylesheets, etc. to serve
alongside your docs and use them inside your docs. Though specifics of how they are
served is actually up to your hosting provider (for example GitHub Pages), **CODEDOC**
comes with some utilities to make referencing your assets in your docs easier.

By default, **CODEDOC** assumes that your assets are to be served from the root of your
project. This helps you access any static file you might have in your repository, and also
keeps the local dev server in sync with how GitHub Pages behaves. So if you have the following
files:

```bash
my-project/.codedoc/...
my-project/docs/md/index.md
my-project/docs/md/whatever/stuff.md
my-project/banner.svg
my-project/images/funny.png
```

You can use images in your docs like this:

```md | docs/md/index.md
![Banner](/banner.svg)
![Funny Image](/images/banner.svg)
```

---

## Project Namespace

It is possible that your project won't be hosted on the root URL of your domain.
For example, your domain might be `https://dude.cute.cloud`, but your docs are served on
`https://dude.cute.cloud/my-project/`. This is for example the case if you are using
GitHub Pages without using a custom domain, where your docs would be served on
`https://<user>.github.io/<repo>`.

**CODEDOC** abstracts away this concern for you, so that you **DO NOT NEED TO** change your
URLs based on your hosting environment. You need to simply configure `.codedoc/config.ts` accordingly:

```ts | .codedoc/config.ts
// ...
export const config = configuration({
  // ...
/*!*/  dest: {
/*!*/    // ...
/*!*/    namespace: '/my-project',
/*!*/  },
  // ...
});
```

And keep using the URLs as if you do not have a namespace:

```md | docs/md/index.md
![Banner](/banner.svg)
![Funny Image](/images/banner.svg)
```

<br>

> [info](:Icon) **UNDER THE HOOD**
>
> Codedoc basically automatically incorporates the project namespace into any link,
> image source, script source or anchor element whose URL starts with `/`.
>
> > :Buttons
> > > :Button label=Learn More, url=/docs/config/output#project-namespace

---

## Local Dev Server

By default, the codedoc dev server (i.e. `codedoc serve`) serves all your assets from
the root folder of your project. It will automatically add the project namespace to the
static URLs and require it when serving the files to fully emulate the behaviour
described above.

---

## Custom Setup

You can override the root folder of your assets via `.codedoc/config.ts`:

```ts | .codedoc/config.ts
// ...
export const config = configuration({
  // ...
/*!*/  dest: {
/*!*/    // ...
/*!*/    assets: 'images',
/*!*/  },
  // ...
});
```

With this configuration, the local dev server will now serve `my-project/images/funny.png`
on `/funny.png` (or `/my-project/funny.png`, if you have a project namespace `/my-project`).
Note that this **DOES NOT AFFECT YOUR HOSTING PROVIDER**, and you would need to modify your
host configuration accordingly for the deployed version to work properly as well (configure it
so that `funny.png` would be available on `/funny.png` when you do not have a namespace
and `/my-project/funny.png` when you do).

> [warning](:Icon) **ATTENTION** [warning](:Icon)
>
> A custom setup as described above **DOES NOT WORK** on GitHub pages since there is no
> way to configure GitHub Pages to serve your static assets on a different URL. _Only use this
> when you have a custom host that have specific configuration requirements._

> :ToCPrevNext