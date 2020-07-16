# Linking Code Snippets

On each code snippet, every line is linkable. Simply click on the line-counter for copying the link.
You can use this feature to reference particular parts of a code-snippet in other parts of your
documents:

```md
[Code behind this link](#code1-l1)
```
[Code behind this link](#code1-l1)

<br>

You can similarly link segments of a code-snippet. Selecting each segment and then clicking on
the line-counter of any of code lines within the selected segment copies the link for the segment.

```md
> So we have some lines here. And we want a link to reference the
> first two lines, omit the third line,
> Which is this line,
> And reference the rest as well, via [a link](#code2-l1:l2-l4)
```
> So we have some lines here. And we want a link to reference the
> first two lines, omit the third line,
> Which is this line,
> And reference the rest as well, via [a link](#code2-l1:l2-l4)

<br>

For single line links, the browser automatically aligns the top part of the window with the line.
For groups, **CODEDOC** handles the scrolling (since no element representing the group exists),
and is more graceful than typical browser behavior. While the default browser behavior has widespread support
even amongst older browsers or no JavaScript environments, if you want to use the linking
feature to highlight different parts of a local code snippet (on the same document), it is highly recommended
to use ranges instead of single lines. For any single line, you could simple use `codeX-lY:lY` instead of `codeX-lY`
(i.e. provide a range including the line itself):

```md
> :Buttons
> > :Button url=#code3-l2:l2, label=First Button Code
>
> > :Button url=#code3-l4:l4, label=Second Button Code
```

> :Buttons
> > :Button url=#code3-l2:l2, label=First Button Code
>
> > :Button url=#code3-l4:l4, label=Second Button Code

> :ToCPrevNext