---
sidebar_position: 1
title: Server Components
description: React Server Components for better performance and SEO
---

# Server Components

## Purpose
React Server Components (RSC) are React components that run exclusively on the server. They allow you to fetch data, access backend resources, and render UI on the server before sending it to the client.

## Why Use Server Components?

### Benefits
- **Better Performance**: Reduce client-side JavaScript bundle size
- **Faster Initial Load**: Server renders HTML immediately
- **Secure**: Keep sensitive logic and API keys on the server
- **SEO-Friendly**: Content is available for search engines
- **Direct Database Access**: Query databases without creating API endpoints

### Zero JavaScript to Client
Server Components don't send JavaScript to the client, which means:
- Smaller bundle sizes
- Faster page loads
- Better performance on low-end devices

## When to Use

### ✅ Use Server Components For:
- **Data Fetching**: Fetching data from databases or APIs
- **Static Content**: Rendering blog posts, documentation, marketing pages
- **Heavy Computations**: Processing data on the server
- **Sensitive Operations**: Authentication, authorization checks
- **SEO-Critical Pages**: Pages that need to be crawled by search engines

### ❌ Don't Use Server Components For:
- **Interactive UI**: Forms, buttons with onClick handlers
- **Client State**: Components using useState, useEffect
- **Browser APIs**: Accessing localStorage, window, document
- **Real-time Updates**: WebSockets, real-time subscriptions

## Use Cases

### 1. Blog or News Site
```tsx
// app/blog/page.tsx
async function getBlogPosts() {
  const posts = await db.query('SELECT * FROM posts')
  return posts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <PostList posts={posts} />
}
```

### 2. E-commerce Product Listing
```tsx
async function ProductsPage() {
  const products = await fetch('https://api.example.com/products')
  const data = await products.json()
  
  return <ProductGrid products={data} />
}
```

### 3. Dashboard with Analytics
```tsx
async function Dashboard() {
  const [users, revenue, orders] = await Promise.all([
    getUserCount(),
    getTotalRevenue(),
    getOrderStats()
  ])
  
  return <DashboardLayout stats={{ users, revenue, orders }} />
}
```

## Key Features

### Automatic Data Fetching
Server Components can be async and use `await` directly:
```tsx
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### No Client-Side Hydration
Components render once on the server and send HTML to client.

### Streaming Support
Can stream rendered UI to client as it becomes available.

## Comparison

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| JavaScript Bundle | ❌ No | ✅ Yes |
| Can use hooks | ❌ No | ✅ Yes |
| Can be async | ✅ Yes | ❌ No |
| Access database | ✅ Yes | ❌ No |
| Event handlers | ❌ No | ✅ Yes |
| SEO | ✅ Excellent | ⚠️ Limited |

## Best Practices

1. **Default to Server Components**: Use Server Components by default
2. **Fetch Data at the Top**: Fetch all data needed at the component level
3. **Parallel Requests**: Use `Promise.all()` for multiple data sources
4. **Cache When Possible**: Leverage Next.js automatic caching
5. **Keep Client Components Small**: Only make interactive parts client components

## Learn More
- [Next.js Server Components Docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
