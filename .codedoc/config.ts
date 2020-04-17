
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    namespace: '/codedoc-docs'
  },
  page: {
    title: {
      base: 'Codedoc'
    }
  },
  misc: {
    github: {
      user: 'CONNECT-platform',
      repo: 'codedoc-docs',
    },
    gitter: {
      room: 'connectv/codedoc'
    }
  },
});
