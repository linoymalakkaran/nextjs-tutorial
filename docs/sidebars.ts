import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '🎨 Rendering',
      collapsed: false,
      items: [
        'rendering/server-components',
        'rendering/client-components',
        'rendering/ssg',
        'rendering/ssr',
        'rendering/isr',
      ],
    },
    {
      type: 'category',
      label: '🛣️ Routing',
      collapsed: false,
      items: [
        'routing/dynamic-routes',
        'routing/parallel-routes',
        'routing/intercepting-routes',
        'routing/route-groups',
      ],
    },
    {
      type: 'category',
      label: '💾 Data Management',
      collapsed: false,
      items: [
        'data-management/server-actions',
        'data-management/api-routes',
        'data-management/database-queries',
        'data-management/tanstack-query',
      ],
    },
    {
      type: 'category',
      label: '🎭 State Management',
      collapsed: false,
      items: [
        'state-management/zustand',
      ],
    },
    {
      type: 'category',
      label: '⚡ Optimization & UX',
      collapsed: false,
      items: [
        'optimization/image-optimization',
        'optimization/metadata',
        'optimization/loading-states',
        'optimization/error-handling',
        'optimization/middleware',
      ],
    },
  ],
};

export default sidebars;
