import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';
import { CodedocTheme } from '@codedoc/core';

import { CardStyle } from './style';


export interface CardOptions {
  raise: string;
}


export function Card(
  this: ThemedComponentThis<CodedocTheme>,
  options: CardOptions,
  renderer: RendererLike<any, any>,
  content: any,
) {
  const classes = this.theme.classes(CardStyle);
  let raise = 'raised-0';
  if (options && options.raise === '1') raise = 'raised-1';
  if (options && options.raise === '2') raise = 'raised-2';

  return <div class={`${classes.card} ${raise}`}>
    {content}
  </div>;
}
