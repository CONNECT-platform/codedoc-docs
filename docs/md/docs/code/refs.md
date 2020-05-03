# Code References

If a line in a code-snippet contains a comment has the syntax `// @see somelink`,
then when the line is hovered a clickable link to `link` will be displayed:

> :Tabs
> > :Tab title=Markdown
> > ````
> > ```cpp
> > void func() {        // @see http://www.cplusplus.com/doc/tutorial/functions/
> >}
> > ```
> > ````
> > ````
> > ```js
> > function func() {     /* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions */
> >}
> > ```
> > ````
> > ````
> > ```python
> > def func():           #@see https://www.learnpython.org/en/Functions
> >   pass
> > ```
> > ````
> > ````
> > ```html
> > &lt;div hidden&gt;&lt;/div&gt;    &lt;!-- @see https://www.w3schools.com/tags/att_global_hidden.asp --&gt;
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```cpp
> > void func() {        // @see http://www.cplusplus.com/doc/tutorial/functions/
> >}
> > ```
> > ```js
> > function func() {     /* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions */
> >}
> > ```
> > ```python
> > def func():           #@see https://www.learnpython.org/en/Functions
> >   pass
> > ```
> > ```html
> > <div hidden></div>    <!-- @see https://www.w3schools.com/tags/att_global_hidden.asp -->
> > ```

---

## Link Titles

You can also use markdown link syntax `[title](link)` for giving your references meaningful
titles:

> :Tabs
> > :Tab title=Markdown
> > ````
> > ```cpp
> > void func() {        // @see [the docs](http://www.cplusplus.com/doc/tutorial/functions/)
> >}
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```cpp
> > void func() {        // @see [the docs](http://www.cplusplus.com/doc/tutorial/functions/)
> >}
> > ```

<br>

> [warning](:Icon) **WARNING**
>
> Only the simple `[title](link)` syntax is supported. So the following would not work:
> - `[title](link "tooltip")`
> - `[title][reference string]`
> - `[title][reference number]`

---

## Tab References

If you have a code snippet inside a `Tabs` component, you can also use references
to reference other tabs, with using `tab:<tab-title>` format for your link:

````
> :Tabs
> > :Tab title=Main Thing
> > ```ts
> > import { Stuff } from './other-thing';      // @see tab:Other Thing
> > import { MoreStuff } from './other-thing';  // @see [le source](tab:Other Thing)
> > ```
>
> > :Tab title=Other Thing
> > ```ts
> > export const Stuff = 2;
> > export const MoreStuff = 3;                 // --> bet you expected more from this code sample didn't ya?
> > ```
````

> :Tabs
> > :Tab title=Main Thing
> > ```ts
> > import { Stuff } from './other-thing';      // @see tab:Other Thing
> > import { MoreStuff } from './other-thing';  // @see [le source](tab:Other Thing)
> > ```
>
> > :Tab title=Other Thing
> > ```ts
> > export const Stuff = 2;
> > export const MoreStuff = 3;                 // --> bet you expected more from this code sample didn't ya?
> > ```

---

## Supported Languages

This feature is currently only supported in languages where one of the following
comment syntaxes is valid:

```
// single-line comment
```
```
/* multi line comment */
```
```
# comment starting with a hash
```
```
&lt;!-- HTML style comment --&gt;
```

> :ToCPrevNext