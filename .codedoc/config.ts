
import { configuration,
        DefaultMarkdownCustomComponents,
        DefaultMarkdownCustomInlineComponents,
        Build,
        CodedocConfig,
} from '@codedoc/core';
import { formulaPlugin } from '@codedoc/core/components';

import { theme } from './theme';
import { Card } from './components/card';
import { Tag } from './components/tag';


export const config = /*#__PURE__*/configuration({
  theme,
  dest: {
    html: 'dist',
    assets: 'dist',
  },
  page: {
    title: {
      base: 'Codedoc',
    },
    favicon: '/favicon.ico',
    meta: {
      subject: 'Beautiful and Modern Software Documentation',
      description: 'An open-source tool to help you easily create best-in-class software documentation for your projects',
      keywords: [
        'documentation',
        'docs',
        'software',
        'code',
        'open-source',
        'open source',
        'codedoc',
        'document',
        'elegant',
        'beautiful',
        'modern',
      ]
    }
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
  afterBuild: [
    async function logFinished(build: Build<CodedocConfig>) {
      console.log();
      console.log('Build Finished!!!!');

      console.log('These files were built:: ');
      console.log(build.source);

      console.log('This config was used:: ');
      console.log(build.config);

      // console.log('These are the generated files:: ');
      // console.log(build.built);

      console.log('Was it partial?:: ');
      console.log(build.partial);
    }
  ],
  plugins: [formulaPlugin],
  markdown: {
    customComponents: {
      ...DefaultMarkdownCustomComponents,
      Card,
    },
    customInlineComponents: {
      ...DefaultMarkdownCustomInlineComponents,
      Tag,
    }
  }
});