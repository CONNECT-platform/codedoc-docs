# Footnotes

You use `Footnote` component to inject some notes which are expanded upon later, i.e. footnotes:

```md
**HTML**

HTML, the predominant markup language for web pages, has no mechanism for marking up notes. Despite a number of different proposals over the years, 
and repeated pleas from the user base, the working group has been unable to reach a consensus on it. Because of this, MediaWiki, for example, 
has had to introduce its own <ref></ref> tag for citing references in notes, an idea which has since also been implemented for generic use 
/*!*/by the Nelson HTML preprocessor.["Nelson HTML Preprocessor". Retrieved 2009-06-09.](:Footnote)

It might be argued that the hyperlink partially eliminates the need for notes, being the web's way to refer to another document. However, it 
does not allow citing to offline sources and if the destination of the link changes, the link can become dead 
/*!*/or irrelevant.[Jill Lepore. "The Cobweb", The New Yorker, 26 January 2015 issue. Retrieved 25 January 2015. Archived from the original.](:Footnote) 
A proposed solution is the use of a digital object identifier.

<br><br>

/*!*/> :Footnotes
```

> **HTML**
>
> HTML, the predominant markup language for web pages, has no mechanism for marking up notes. Despite a number of different proposals over the years, and repeated pleas from the user base, the working group has been unable to reach a consensus on it. Because of this, MediaWiki, for example, has had to introduce its own <ref></ref> tag for citing references in notes, an idea which has since also been implemented for generic use by the Nelson HTML preprocessor.["Nelson HTML Preprocessor". Retrieved 2009-06-09.](:Footnote)
>
> It might be argued that the hyperlink partially eliminates the need for notes, being the web's way to refer to another document. However, it does not allow citing to offline sources and if the destination of the link changes, the link can become dead or irrelevant.[Jill Lepore. "The Cobweb", The New Yorker, 26 January 2015 issue. Retrieved 25 January 2015. Archived from the original.](:Footnote) A proposed solution is the use of a digital object identifier.
> 
> <br><br>
>
> > :Footnotes

<br>

Footnotes are marked in the text using the `Footnote` component. Then, they are displayed together where the next `Footnotes` component
appears. This also means that you can have multiple footnote sections. In that case, the indexing of the notes will keep increasing,
but each footnote will only appear as part of the next `Footnotes` section after it.

---

## Shared References

Multiple parts of the text can reference the same footnote. For that, the footnote must be given an id, and subsequent
references to this footnote can only reference the id without providing additional content:

```md
So this[Only one note](:Footnote (id=X)) and this[](:Footnote (id=X)) will reference the same thing.

> :Footnotes
```

> So this[Only one note](:Footnote (id=X)) and this[](:Footnote (id=X)) will reference the same thing.
>
> > :Footnotes

---

## Rich Text Content

If you want to have rich content as part of a footnote, you can use the quoted version of the `Footnote`
component to outline your content, and then refer to it using an id:

```md
So this[](:Footnote (id=Y)) will reference a note with more involved text.

> :Footnote id=Y
>
> So in this note we can have stuff:
> - Such as lists
> - Or **styled** text
> - Or any other markdown basically

> :Footnotes
```

So this[](:Footnote (id=Y)) will reference a note with more involved text.

> :Footnote id=Y
>
> So in this note we can have stuff:
> - Such as lists
> - Or **styled** text
> - Or any other markdown basically

> :Footnotes

> :ToCPrevNext