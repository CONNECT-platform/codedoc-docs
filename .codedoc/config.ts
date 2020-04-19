
import { configuration, DefaultMarkdownCustomComponents } from '@codedoc/core';

import { theme } from './theme';
import { Card } from './components/card';


export const config = /*#__PURE__*/configuration({
  theme,
  page: {
    title: {
      base: 'Codedoc'
    },
    favicon: '/favicon.ico'
  },
  misc: {
    github: {
      user: 'CONNECT-platform',
      repo: 'codedoc',
    },
    gitter: {
      room: 'connectv/codedoc'
    }
  },
  markdown: {
    customComponents: {
      ...DefaultMarkdownCustomComponents,
      Card,
    }
  }
});
