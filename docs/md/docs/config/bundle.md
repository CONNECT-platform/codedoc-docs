# Bundle Configuration

You can add your own client-side scripts to the codedoc bundle using
`bundle` configuration and its `init` property. Lets say we want to
add a function that says hellow:

<br>

**STEP 1**\
Add `.codedoc/hellow.ts`:

```ts | .codedoc/hellow.ts
import { funcTransport } from '@connectv/sdh/transport';


export function hellow() {
  console.log('Hellow');
}

export const hellow$ = /*#__PURE__*/funcTransport(hellow);
```

<br>

**STEP2**\
Add the transported `hellow$` function to your bundle's initialization scripts:

```ts | .codedoc/config.ts
import { 
  configuration, 
/*!*/  DefaultConfig 
} from '@codedoc/core';

/*!*/import { hello$ } from './hellow';

//...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  bundle: {
/*!*/    init: [
/*!*/      ...DefaultConfig.bundle.init,
/*!*/      hellow$
/*!*/    ]
/*!*/  },
  //...
});
```

<br>

> :Buttons
> > :Button label=Learn More about CONNECTIVE SDH, url=https://github.com/CONNECT-platform/connective-sdh

<br>

> <span class="icon-font" style="vertical-align: sub">warning</span> **WARNING**
>
> Make sure you include `DefaultConfig.bundle.init` in your initialization scripts array,
> as otherwise the initialization script for many of **CODEDOC** features will not be loaded
> and they will stop working.


> :ToCPrevNext