import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';
import { CodedocTheme } from '@codedoc/core';


import { TagStyle } from './style';


export function Tag(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(TagStyle);
  return <span class={classes.tag}># {content}</span>
}
