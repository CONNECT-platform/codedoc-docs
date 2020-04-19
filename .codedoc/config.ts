
import { configuration } from '@codedoc/core';

import { theme } from './theme';


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
});
