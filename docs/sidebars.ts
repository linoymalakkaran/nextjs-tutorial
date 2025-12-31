import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Rendering Patterns',
      items: [
        'rendering/server-components',
        'rendering/client-components',
        'rendering/streaming-suspense',
      ],
    },
    {
      type: 'category',
      label: 'Data Fetching',
      items: [
        'data/server-actions',
        'data/api-routes',
        'data/tanstack-query',
        'data/database-queries',
      ],
    },
    {
      type: 'category',
      label: 'State Management',
      items: [
        'state/zustand',
      ],
    },
    {
      type: 'category',
      label: 'Routing & Navigation',
      items: [
        'routing/dynamic-routes',
        'routing/parallel-routes',
        'routing/intercepting-routes',
        'routing/route-handlers',
      ],
    },
    {
      type: 'category',
      label: 'Optimization',
      items: [
        'optimization/image-optimization',
        'optimization/font-optimization',
        'optimization/lazy-loading',
        'optimization/metadata-seo',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Features',
      items: [
        'advanced/middleware',
        'advanced/error-handling',
      ],
    },
  ],
};

export default sidebars;
