import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'e58'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '2ce'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '11b'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f13'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'bff'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '830'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', '390'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '391'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', '4e8'),
            routes: [
              {
                path: '/docs/advanced/error-handling',
                component: ComponentCreator('/docs/advanced/error-handling', '881'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/advanced/middleware',
                component: ComponentCreator('/docs/advanced/middleware', 'fdb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/data/api-routes',
                component: ComponentCreator('/docs/data/api-routes', 'dd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/data/database-queries',
                component: ComponentCreator('/docs/data/database-queries', '9ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/data/server-actions',
                component: ComponentCreator('/docs/data/server-actions', '96a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/data/tanstack-query',
                component: ComponentCreator('/docs/data/tanstack-query', '7be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/optimization/font-optimization',
                component: ComponentCreator('/docs/optimization/font-optimization', 'd92'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/optimization/image-optimization',
                component: ComponentCreator('/docs/optimization/image-optimization', '674'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/optimization/lazy-loading',
                component: ComponentCreator('/docs/optimization/lazy-loading', '539'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/optimization/metadata-seo',
                component: ComponentCreator('/docs/optimization/metadata-seo', 'cd3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rendering/client-components',
                component: ComponentCreator('/docs/rendering/client-components', '676'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rendering/server-components',
                component: ComponentCreator('/docs/rendering/server-components', 'ec6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rendering/streaming-suspense',
                component: ComponentCreator('/docs/rendering/streaming-suspense', 'b70'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/routing/dynamic-routes',
                component: ComponentCreator('/docs/routing/dynamic-routes', '898'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/routing/intercepting-routes',
                component: ComponentCreator('/docs/routing/intercepting-routes', 'be1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/routing/parallel-routes',
                component: ComponentCreator('/docs/routing/parallel-routes', 'd5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/routing/route-handlers',
                component: ComponentCreator('/docs/routing/route-handlers', '3d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/state/zustand',
                component: ComponentCreator('/docs/state/zustand', '652'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
