const fs = require('fs');
const path = require('path');

const features = [
  // Rendering
  {
    source: '../app/features/server-components/README.md',
    dest: 'docs/rendering/server-components.md',
    title: 'Server Components',
    description: 'React Server Components for better performance and SEO',
    position: 1,
    category: 'rendering'
  },
  {
    source: '../app/features/client-components/README.md',
    dest: 'docs/rendering/client-components.md',
    title: 'Client Components',
    description: 'Interactive React components with state and event handlers',
    position: 2,
    category: 'rendering'
  },
  {
    source: '../app/features/ssg/page.tsx',
    dest: 'docs/rendering/ssg.md',
    title: 'Static Site Generation (SSG)',
    description: 'Pre-render pages at build time for optimal performance',
    position: 3,
    category: 'rendering',
    createPlaceholder: true
  },
  {
    source: '../app/features/ssr/page.tsx',
    dest: 'docs/rendering/ssr.md',
    title: 'Server-Side Rendering (SSR)',
    description: 'Dynamic rendering on each request',
    position: 4,
    category: 'rendering',
    createPlaceholder: true
  },
  {
    source: '../app/features/isr/page.tsx',
    dest: 'docs/rendering/isr.md',
    title: 'Incremental Static Regeneration (ISR)',
    description: 'Update static pages after build with revalidation',
    position: 5,
    category: 'rendering',
    createPlaceholder: true
  },
  // Data Management
  {
    source: '../app/features/server-actions/README.md',
    dest: 'docs/data-management/server-actions.md',
    title: 'Server Actions',
    description: 'Server-side form handling without API routes',
    position: 1,
    category: 'data-management'
  },
  {
    source: '../app/features/api-routes/README.md',
    dest: 'docs/data-management/api-routes.md',
    title: 'API Routes',
    description: 'Build RESTful API endpoints in Next.js',
    position: 2,
    category: 'data-management'
  },
  {
    source: '../app/features/database-queries/README.md',
    dest: 'docs/data-management/database-queries.md',
    title: 'Database Queries',
    description: 'Server-side database patterns and best practices',
    position: 3,
    category: 'data-management'
  },
  {
    source: '../app/features/tanstack-query/README.md',
    dest: 'docs/data-management/tanstack-query.md',
    title: 'TanStack Query',
    description: 'Powerful data fetching and caching for client components',
    position: 4,
    category: 'data-management'
  },
  // State Management
  {
    source: '../app/features/zustand/README.md',
    dest: 'docs/state-management/zustand.md',
    title: 'Zustand',
    description: 'Lightweight and fast state management',
    position: 1,
    category: 'state-management'
  },
  // Routing
  {
    source: '../app/features/dynamic-routes/page.tsx',
    dest: 'docs/routing/dynamic-routes.md',
    title: 'Dynamic Routes',
    description: 'Dynamic segments and catch-all routes',
    position: 1,
    category: 'routing',
    createPlaceholder: true
  },
  {
    source: '../app/features/parallel-routes/page.tsx',
    dest: 'docs/routing/parallel-routes.md',
    title: 'Parallel Routes',
    description: 'Render multiple pages simultaneously',
    position: 2,
    category: 'routing',
    createPlaceholder: true
  },
  {
    source: '../app/features/intercepting-routes/page.tsx',
    dest: 'docs/routing/intercepting-routes.md',
    title: 'Intercepting Routes',
    description: 'Intercept routes to show modals or overlays',
    position: 3,
    category: 'routing',
    createPlaceholder: true
  },
  {
    source: '../app/features/route-groups/page.tsx',
    dest: 'docs/routing/route-groups.md',
    title: 'Route Groups',
    description: 'Organize routes without affecting URL structure',
    position: 4,
    category: 'routing',
    createPlaceholder: true
  },
  // Optimization
  {
    source: '../app/features/image-optimization/page.tsx',
    dest: 'docs/optimization/image-optimization.md',
    title: 'Image Optimization',
    description: 'Automatic image optimization with Next.js Image component',
    position: 1,
    category: 'optimization',
    createPlaceholder: true
  },
  {
    source: '../app/features/metadata/page.tsx',
    dest: 'docs/optimization/metadata.md',
    title: 'Metadata & SEO',
    description: 'SEO-friendly metadata generation',
    position: 2,
    category: 'optimization',
    createPlaceholder: true
  },
  {
    source: '../app/features/loading/page.tsx',
    dest: 'docs/optimization/loading-states.md',
    title: 'Loading States',
    description: 'Loading UI and Suspense boundaries',
    position: 3,
    category: 'optimization',
    createPlaceholder: true
  },
  {
    source: '../app/features/error-handling/page.tsx',
    dest: 'docs/optimization/error-handling.md',
    title: 'Error Handling',
    description: 'Error boundaries and error pages',
    position: 4,
    category: 'optimization',
    createPlaceholder: true
  },
  {
    source: '../middleware.ts',
    dest: 'docs/optimization/middleware.md',
    title: 'Middleware',
    description: 'Run code before request completion',
    position: 5,
    category: 'optimization',
    createPlaceholder: true
  }
];

function addFrontmatter(content, { title, description, position }) {
  const frontmatter = `---
sidebar_position: ${position}
title: ${title}
description: ${description}
---

`;
  
  return frontmatter + content;
}

function createPlaceholder({ title, description, position, category }) {
  const featurePath = category.replace('-', '-')
  return `---
sidebar_position: ${position}
title: ${title}
description: ${description}
---

# ${title}

## Overview

${description}

This feature demonstrates ${title.toLowerCase()} in Next.js 14. The implementation includes working examples with detailed inline comments explaining key concepts.

## 🎯 Key Features

- Complete working example in the Next.js app
- Inline code comments explaining implementation
- Real-world use cases
- Best practices demonstrated

## 📝 View the Implementation

To see this feature in action:

1. **Run the Next.js app**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Visit the feature page**:
   - Navigate to \`http://localhost:3000/features/${category}\`
   - Or click on "${title}" from the home page

3. **Explore the code**:
   - Check \`app/features/${category}/page.tsx\` for the implementation
   - Read the inline comments for detailed explanations
   - Experiment by modifying the code

## 💡 When to Use

This feature is best used when you need to ${description.toLowerCase()}.

## 📚 Learn More

- [Next.js Official Documentation](https://nextjs.org/docs)
- View the source code in \`app/features/${category}/\`
- Experiment with the live example at \`http://localhost:3000/features/${category}\`

---

**Tip**: The best way to learn is by running the application and exploring the code. Each feature includes practical examples you can modify and experiment with!
`;
}

// Process each feature
features.forEach(feature => {
  const sourcePath = path.join(__dirname, feature.source);
  const destPath = path.join(__dirname, feature.dest);
  
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  if (fs.existsSync(sourcePath) && !feature.createPlaceholder) {
    let content = fs.readFileSync(sourcePath, 'utf8');
    content = addFrontmatter(content, feature);
    fs.writeFileSync(destPath, content);
    console.log(`✅ Copied: ${feature.title}`);
  } else if (feature.createPlaceholder) {
    const content = createPlaceholder(feature);
    fs.writeFileSync(destPath, content);
    console.log(`📝 Created placeholder: ${feature.title}`);
  } else {
    console.log(`⚠️  Not found: ${feature.source}`);
  }
});

console.log('\n✨ Documentation files processed!');
