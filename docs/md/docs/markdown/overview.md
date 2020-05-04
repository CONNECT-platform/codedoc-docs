# Markdown Features

**CODEDOC** parses markdown documents using [`@connectv/marked`](https://github.com/CONNECT-platform/marked) package,
which is in turn based on [`marked`](https://marked.js.org/#/README.md#README.md). This means it supports following
markdown flavours:

- [CommonMark](http://spec.commonmark.org/0.29/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

Additionally, you can use [quoted components syntax](https://github.com/CONNECT-platform/marked#custom-quoted-components)
and [linked components syntax](https://github.com/CONNECT-platform/marked#custom-linked-components)
of `@connectv/marked`. These allows for custom structural components (like buttons, tabs, etc.) to be
used inside your markdown files, thereby greatly extending functionality of standard markdown.

---

## Component Syntax

### Quoted Components

The quoted component syntax allows for using custom structural components using markdown's own
`block-quote` element:

```md
Some other _markdown_ stuff

/*!*/> :Component1 attr1=value1, attr2=value2, ...                     <!--> Component definition -->
/*!*/>                                                                 <!--> This new line is important, because markdown -->
/*!*/> Contents of the component, which is simply **more markdown**.   <!--> More markdown to be included as contents of the component. -->
```

The first line of the block-quote must be the component reference, starting with `:<component-name>`. Arguments can be
passed to the component via the attributes on the same line, with the syntax `attribute=value` separated by `,`.
Some components can also have child content, which can be any markdown content. This content **MUST** be separated
from the first line by an empty line, as otherwise it might get interpreted as continuation of the component definition
line (i.e. the first line).

Since components can have markdown content, this means you can use child components within a parent component as well:

```md
> :ParentComponent attr=value
>
> Some content.
/*!*/> > :ChildComponent child attr=child value, child attr 2=child value 2
/*!*/> >
/*!*/> > Child component's content
>
/*!*/> > :SecondChildComponent
```

<br>

### Linked Components

Similar to quoted components, the linked components allow for using custom structural _inline_ components,
i.e. components that are whithin other pieces of text, using markdown's `link` elements:

```md
I have some [custom markdown](:InlineComp (attr1=value1, attr2=value2, ...)) amongst
some other **markdown** stuff I am writing.
```

The URL of the link should start with `:` followed by the inline component name, i.e. `:<component-name>`,
and the title (for convenience put in parantheses in above example) can be utilized to
pass arguments to the component, with the syntax `attribute=value`, separated by `,`. The text of the link
is passed to the component as its content, so it can be any markdown accepted as a link's text.
Note that since you cannot nest markdown links inside each other, you **CANNOT** nest inline components
inside each other as well.

Note that linked components and quoted components use separate component namespaces, so you can
utilize the same component name for both a quoted component and a linked component.

---

## Default Components

### Tabs

```md
> :Tabs
> > :Tab title=First Tab
> >
> > Content of the first tab
>
> > :Tab title=Second Tab
> >
> > Content of the second tab
```

> :Tabs
> > :Tab title=First Tab
> >
> > Content of the first tab
>
> > :Tab title=Second Tab
> >
> > Content of the second tab

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/tabs

<br>

### Buttons

```md
> :Buttons
> > :Button icon=true, label=android, url=https://www.google.com
>
> > :Button label=Twitter, url=https://www.twitter.com
```
> :Buttons
> > :Button icon=true, label=android, url=https://www.google.com
>
> > :Button label=Twitter, url=https://www.twitter.com

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/buttons

<br>

### Collapse

```md
> :Collapse label=Collapsible, default=open
>
> Some collapsible content
```

> :Collapse label=Collapsible, default=open
>
> Some collapsible content

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/collapse

<br>

### ToC Navigation

```md
> :ToCPrevNext
```

> :ToCPrevNext

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/toc-nav

<br>

### Formula

```md
Let [G](:Formula) be any consistent logic, and [s](:Formula) a statement
in [G](:Formula) defined by [s \equiv G \cancel{\vdash} s](:Formula). Then:

> :Formula
>
> G \vdash s \implies G \vdash (G \cancel{\vdash} s) \implies \bot \implies \neg{(G \vdash s)}
>
> G \vdash \neg{s} \implies G \vdash (G \vdash s) \implies G \vdash s \implies \bot \implies \neg{(G \vdash \neg{s})}
>
> \overset{\tiny \text{1,2}}{\implies} \neg(G \vdash s) \land \neg(G \vdash \neg{s})

Which means [G](:Formula) cannot be complete, as it neither proves nor disproves [s](:Formula).
```

Let [G](:Formula) be any consistent logic, and [s](:Formula) a statement
in [G](:Formula) defined by [s \equiv G \cancel{\vdash} s](:Formula). Then:

> :Formula
>
> G \vdash s \implies G \vdash (G \cancel{\vdash} s) \implies \bot \implies \neg{(G \vdash s)}
>
> G \vdash \neg{s} \implies G \vdash (G \vdash s) \implies G \vdash s \implies \bot \implies \neg{(G \vdash \neg{s})}
>
> \overset{\tiny \text{1,2}}{\implies} \neg(G \vdash s) \land \neg(G \vdash \neg{s})

Which means [G](:Formula) cannot be complete, as it neither proves nor disproves [s](:Formula).

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/formula

<br>

### Page-Specific Meta

```md
> :MetaOverride target=keywords, behavior=extend
>
> some, additional, keywords, for this particular page
```

`MetaOverride` component allows you to specify overrides for meta information
of a particular page.

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/meta-override

<br>

### Dark/Light Content

```md
> :DarkLight
> > :InDark
> >
> > Only visible in dark. Change to light mode to see other stuff.
> > ![Night Image](https://9to5mac.com/wp-content/uploads/sites/6/2018/06/mojave-night.jpg?quality=82&strip=all&w=600)
>
> > :InLight
> >
> > Only visible in light. Change to dark mode to see other stuff.
> > ![Day Image](https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-day-wallpaper-r-610x343.jpg)
```

> :DarkLight
> > :InDark
> >
> > Only visible in dark. Change to light mode to see other stuff.
> > ![Night Image](https://9to5mac.com/wp-content/uploads/sites/6/2018/06/mojave-night.jpg?quality=82&strip=all&w=610)
>
> > :InLight
> >
> > Only visible in light. Change to dark mode to see other stuff.
> > ![Day Image](https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-day-wallpaper-r-610x343.jpg)

<br>

### Icon

```md
/*!*/You can use icons like [face](:Icon) in the middle of markdown.
Checkout [material design icons](https://material.io/resources/icons/?style=baseline)
for possible glyphs.
```

You can use icons like [face](:Icon) in the middle of markdown.
Checkout [material design icons](https://material.io/resources/icons/?style=baseline)
for possible glyphs.

<br>

### Watermark

```md
> :Watermark
```

> :Watermark

<br>

---

## Custom Components

With some knowledge of [Typescript](https://www.typescriptlang.org) and 
TSX/JSX, you can create your own custom components
that you can use in your doc markdowns. Codedoc simply uses [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh)
for its components system (including in-markdown components), which allows you to create even dynamic and fully
interactive components in your markdowns (as every element you see in these docs is also a SDH component).

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/custom-components

> :ToCPrevNext