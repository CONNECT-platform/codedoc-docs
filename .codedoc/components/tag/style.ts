import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '@codedoc/core';


export const TagStyle = themedStyle<CodedocTheme>(theme => ({
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    height: 16,
    borderRadius: 16,
    padding: 8,
    background: theme.light.primary,
    color: theme.light.primaryContrast,

    'body.dark &': { 
      background: theme.dark.primary,
      color: theme.dark.primaryContrast,
    },
  }
}));
