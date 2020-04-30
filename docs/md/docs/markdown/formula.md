# Formula

The `Formula` component allows for using math formulas in your docs:

> :Tabs
> > :Tab title=Markdown
> > ````
> > > :Formula align=center
> > >
> > > ```
> > > f_n = 
> > > \begin{cases}
> > > 1 & \text{if \(n \leq 2\)} \\
> > > f_{n - 1} + f_{n - 2} & \text{otherwise} \\
> > > \end{cases}
> > > ```
> > ````
>
> > :Tab title=How it Looks
> > > :Formula align=center
> > >
> > > ```
> > > f_n = 
> > > \begin{cases}
> > > 1 & \text{if \(n \leq 2\)} \\
> > > f_{n - 1} + f_{n - 2} & \text{otherwise} \\
> > > \end{cases}
> > > ```

<br>

> <span class="icon-font" style="vertical-align: sub">error</span> **IMPORTANT**
>
> **YOU MUST ENABLE FORMULAS** via config to be able to use them. Read [the following section](#enabling-formulas)
> to find out how to enable Formulas.

---

## Enabling Formulas

Formulas require specific stylesheets to properly function. To control the size of each doc page,
by default these stylesheets are not included in **CODEDOC**. You can enable them via `.codedoc/config.ts`
easily like this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
/*!*/import { enableFormula } from '@codedoc/core/components';

// ...

export const config = /*#__PURE__*/configuration({
  // ...
  page: {
    // ...
/*!*/    post: [
/*!*/      enableFormula,
/*!*/      // ...
/*!*/    ]
  },
  // ...
});
```

---

## TeX Capabilities

**CODEDOC** uses [KaTeX](https://katex.org) for producing its formulas, which means
you can [check this support table](https://katex.org/docs/support_table.html) to find out
which TeX functions are available. If you are lazy like me, you can also just use this
nice cheatsheet:

> :Buttons
> > :Button label=TeX Cheatsheet, url=http://tug.ctan.org/info/undergradmath/undergradmath.pdf

---

## Syntax Collision

Markdown syntax can collide with Tex functions. For example, if you have this
formula:
```tex
\begin{pmatrix}
1 & -1 \\
-1 & i
\end{pmatrix}
```

Then the row delimiter, `\\`, would collide with markdown syntax.
To avoid that, you can simply enclose the colliding parts 
with single backtick (i.e. <code>\`</code> character):

> :Tabs
> > :Tab title=Markdown
> > ```md
> > > :Formula 
> > >
> > > \begin{pmatrix}
> >/*!*/> 1 & -1 `\\`       <!--> the `\\` is enclosed with backticks to avoid collision with markdown -->
> > > -1 & i
> > > \end{pmatrix}
> > ```
>
> > :Tab title=How it Looks
> > > :Formula
> > >
> > > \begin{pmatrix}
> > > 1 & -1 `\\`
> > > -1 & i
> > > \end{pmatrix}

Alternatively, you could put all of your formula in a code-block (enclose it with three backticks, i.e. <code>\`\`\`</code>):

> :Tabs
> > :Tab title=Markdown
> > ````md
> > > :Formula 
> > >
> >/*!*/> ```                <!--> the whole formula is enclosed-->
> >/*!*/> \begin{pmatrix}
> >/*!*/> 1 & -1 \\          <!--> so the \\ doesn't need to be any more-->
> >/*!*/> -1 & i
> >/*!*/> \end{pmatrix}
> >/*!*/> ```
> > ````
>
> > :Tab title=How it Looks
> > > :Formula 
> > >
> > > ```
> > > \begin{pmatrix}
> > > 1 & -1 \\
> > > -1 & i
> > > \end{pmatrix}
> > > ```

---

## Size and Alignment

You can use `align` property to align formulas at the center. It can either
be set to `left` or `center`:

> :Tabs
> > :Tab title=Markdown
> > ```md
> > > :Formula align=center
> > >
> > > G_{\mu\nu} + \Lambda g_{\mu\nu} = \cfrac{8\pi G}{c^4}T_{\mu\nu}
> > ```
>
> > :Tab title=How it Looks
> > > :Formula align=center
> > >
> > > G_{\mu\nu} + \Lambda g_{\mu\nu} = \cfrac{8\pi G}{c^4}T_{\mu\nu}

You can also utilize `size` property to control size of your formulas. It can either
be set to `normal` or `large`:

> :Tabs
> > :Tab title=Markdown
> > ```md
> > > :Formula size=large, align=center
> > >
> > > G_{\mu\nu} + \Lambda g_{\mu\nu} = \cfrac{8\pi G}{c^4}T_{\mu\nu}
> > ```
>
> > :Tab title=How it Looks
> > > :Formula size=large, align=center
> > >
> > > G_{\mu\nu} + \Lambda g_{\mu\nu} = \cfrac{8\pi G}{c^4}T_{\mu\nu}

---

## Formula Lines

Each paragraph or code-block will be assumed as one line of formula, independent
of how many actual lines it consists of:

> :Tabs
> > :Tab title=Markdown
> > ```md
> > > :Formula
> > >
> > > \text{let}`\;`s \equiv G \cancel{\vdash} s
> > >
> > > G \vdash s \implies G \vdash (G \cancel{\vdash} s) \implies \bot
> > >
> > > G \vdash \neg{s} \implies G \vdash (G \vdash s) \implies G \vdash s \implies \bot
> > >
> >/*!*/> \implies \neg(G \vdash s) \land \neg(G \vdash \neg{s}) `\\`   <!--> despite the newline, these will all be displayed as one "line" -->
> >/*!*/> \implies G `\;`\text{is not complete.}                        <!--> despite the newline, these will all be displayed as one "line" -->
> > ```
>
> > :Tab title=How it Looks
> > > :Formula
> > >
> > > \text{let}`\;`s \equiv G \cancel{\vdash} s
> > >
> > > G \vdash s \implies G \vdash (G \cancel{\vdash} s) \implies \bot
> > >
> > > G \vdash \neg{s} \implies G \vdash (G \vdash s) \implies G \vdash s \implies \bot
> > >
> > > \implies \neg(G \vdash s) \land \neg(G \vdash \neg{s}) `\\`
> > > \implies G `\;`\text{is not complete.}

<br>

> :Tabs
> > :Tab title=Markdown
> > ````md
> > > :Formula
> > > 
> > > ```
> > > \frak{L}_{SM} = \quad
> > > \underbrace{
> > >   \frac{1}{4} W_{\mu\nu} 
> > >   \cdot \frac{1}{4} W^{\mu\nu} 
> > >   - \frac{1}{4} G^a_{\mu\nu} G^{\mu\nu}_a
> > > }_{\tiny{\text{kinetic energies and self-interactions of gauge bosons}}}
> > > ```
> > > ```
> > > \quad\quad\;+ \quad \underbrace{
> > >   \bar{L} \gamma^{\mu} (i\partial_\mu - \frac{1}{2}g\tau \cdot W_\mu - \frac{1}{2}g'YB_\mu)L
> > >  + \bar{R} \gamma^{\mu} (i\partial_\mu - \frac{1}{2}g'YB_\mu)R
> > > }_{\tiny{\text{kinetic energies and electroweak interactions of fermions}}}
> > > ```
> > > ```
> > > \quad\quad\; + \quad \underbrace{
> > >   \frac{1}{2}|(i\partial_\mu - \frac{1}{2}g\tau \cdot W_\mu) - \frac{1}{2}g'YB_\mu|^2 - V(\phi)
> > > }_{\tiny{W\pm,Z,\gamma\text{and Higgs masses and couplings}}}
> > > ```
> > > ```
> > > \quad\quad\; + \quad \underbrace{
> > >   g''(\bar{q}\gamma^\mu T_a q) G^a_\mu
> >/*!*/> }_{\tiny{\text{interactions between gluons and quarks}}} \\       <!--> despite the newline, these will all be displayed as one "line" -->
> >/*!*/> \space \\                                                         <!--> despite the newline, these will all be displayed as one "line" -->
> > > \quad\quad\; + \quad \underbrace{
> > >   (G_1 \bar{L}\phi R + G_2 \bar{L}\phi_c R + h.c.)
> > > }_{\tiny{\text{fermion masses and couplings to Higgs}}}
> > > ```
> > ````
>
> > :Tab title=How it Looks
> > > :Formula
> > > 
> > > ```
> > > \frak{L}_{SM} = \quad
> > > \underbrace{
> > >   \frac{1}{4} W_{\mu\nu} 
> > >   \cdot \frac{1}{4} W^{\mu\nu} 
> > >   - \frac{1}{4} G^a_{\mu\nu} G^{\mu\nu}_a
> > > }_{\tiny{\text{kinetic energies and self-interactions of gauge bosons}}}
> > > ```
> > > ```
> > > \quad\quad\;+ \quad \underbrace{
> > >   \bar{L} \gamma^{\mu} (i\partial_\mu - \frac{1}{2}g\tau \cdot W_\mu - \frac{1}{2}g'YB_\mu)L
> > >  + \bar{R} \gamma^{\mu} (i\partial_\mu - \frac{1}{2}g'YB_\mu)R
> > > }_{\tiny{\text{kinetic energies and electroweak interactions of fermions}}}
> > > ```
> > > ```
> > > \quad\quad\; + \quad \underbrace{
> > >   \frac{1}{2}|(i\partial_\mu - \frac{1}{2}g\tau \cdot W_\mu) - \frac{1}{2}g'YB_\mu|^2 - V(\phi)
> > > }_{\tiny{W\pm,Z,\gamma\text{and Higgs masses and couplings}}}
> > > ```
> > > ```
> > > \quad\quad\; + \quad \underbrace{
> > >   g''(\bar{q}\gamma^\mu T_a q) G^a_\mu
> > > }_{\tiny{\text{interactions between gluons and quarks}}} \\
> > > \space \\
> > > \quad\quad\; + \quad \underbrace{
> > >   (G_1 \bar{L}\phi R + G_2 \bar{L}\phi_c R + h.c.)
> > > }_{\tiny{\text{fermion masses and couplings to Higgs}}}
> > > ```

> :ToCPrevNext