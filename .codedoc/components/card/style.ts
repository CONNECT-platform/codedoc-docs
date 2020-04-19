import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '@codedoc/core';


export const CardStyle = themedStyle<CodedocTheme>(theme => ({
  card: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: 8,
    padding: 8,
    maxWidth: 320,
    margin: 16,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'box-shadow .3s, transform .3s',

    '&.raised-0': { boxShadow: '0 1px 3px rgba(0, 0, 0, .12)' },
    '&.raised-1': { boxShadow: '0 3px 6px rgba(0, 0, 0, .18)' },
    '&.raised-2': { boxShadow: '0 6px 18px rgba(0, 0, 0, .25)' },
    '&:hover': {
      boxShadow: '0 6px 18px rgba(0, 0, 0, .25)',
      transform: 'translateY(-8px)'
    },

    '& img': {
      margin: -8,
      marginTop: -24,
      width: 'calc(100% + 16px)',
      maxWidth: 'none',
    },

    '& strong': {
      color: theme.light.primary,
      'body.dark &': { color: theme.dark.primary },
      fontSize: 18,
      display: 'block',
    },
  }
}));
