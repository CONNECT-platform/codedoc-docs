# Code Hints

If a line in a code-snippet has the syntax `--> hint text`, then the `hint text` will
be displayed on a hint-box when the line is hovered (the cursor is upon it):

> :Tabs
> > :Tab title=Markdown
> > ````
> > ```cpp
> > void func() {        // --> this function does nothing
> >}
> > ```
> > ````
> > ````
> > ```js
> > function func() {     /* --> this function does nothing */
> >}
> > ```
> > ````
> > ````
> > ```python
> > def func():           # --> this function does nothing
> >   pass
> > ```
> > ````
> > ````
> > ```html
> > &lt;div hidden&gt;&lt;/div&gt;    &lt;!--&gt; this displays nothing --&gt;
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```cpp
> > void func() {        // --> this function does nothing
> >}
> > ```
> > ```js
> > function func() {     /* --> this function does nothing */
> >}
> > ```
> > ```python
> > def func():           # --> this function does nothing
> >   pass
> > ```
> > ```html
> > <div hidden></div>    <!--> this displays nothing -->
> > ```

---

## Language Support

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