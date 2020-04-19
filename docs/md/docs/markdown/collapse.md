# Collapse

The `Collapse` component allows you to have some collapsible content:

```md
/*!*/> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
/*!*/>                             <!--> The whitespace is important -->
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?
```

> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
>
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?

You can also have nested collapses within each other:

```md
/*!*/> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
/*!*/>
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?
>
/*!*/> > :Collapse label=1914 translation by H. Rackham
/*!*/> >
> > But I **MUST** explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you 
> > a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder 
> > of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do 
> > not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves 
> > or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil 
> > and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, 
> > except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that 
> > has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
```

> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
>
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?
>
> > :Collapse label=1914 translation by H. Rackham
> >
> > But I **MUST** explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you 
> > a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder 
> > of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do 
> > not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves 
> > or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil 
> > and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, 
> > except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that 
> > has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

The `Collapse` component is specifically designed to be used in the table of contents markdown, when you have long list of entries
and want to categorize them nicely. For example, this is the actual code of the ToC of the docs you are reading right now:

```md | docs/md/_toc.md
[Home](/)
[Overview](/docs/overview)
[CLI](/docs/cli)
[Theme](/docs/theme)

> :Collapse label=Markdown
>
> [Markdown Overview](/docs/markdown/overview)
> [Buttons](/docs/markdown/buttons)
> [Tabs](/docs/markdown/tabs)
> [Collapse](/docs/markdown/collapse)
> [ToC Navigation](/docs/markdown/toc-nav)
> [Custom Components](/docs/markdown/custom-components)

> :Collapse label=Code Features
>
> [Code Features Overview](/docs/code/overview)
> [Highlights](/docs/code/highlights)
> [Hints](/docs/code/hints)
> [References](/docs/code/refs)
> [Top-Bar](/docs/code/wmbar)

[Images & Assets](/docs/assets)

> :Collapse label=Configuration
>
> [Config Overview](/docs/config/overview)
> [Entry Files](/docs/config/entry)
> [Output Files](/docs/config/output)
> [Page Config](/docs/config/page)
> [Bundle Config](/docs/config/bundle)
> [Markdown Config](/docs/config/markdown)
> [Miscellaneous](/docs/config/misc)
```

---

## Default State

You can set the default state of a `Collapse` by setting its `default` property.
Its values can either be `open` or `close`.

```md
/*!*/> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC, default=open
>
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?
```

> :Collapse label=Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC, default=open
>
> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
> eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
> voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
> sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
> numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
> nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
> eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
> eum fugiat quo voluptas nulla pariatur?


> :ToCPrevNext