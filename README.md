# Next.js Learning Application 🚀

A comprehensive Next.js 14 application showcasing **all major features** organized as separate, easy-to-understand modules. Perfect for learning Next.js from basics to advanced concepts!

## 🎯 Two Ways to Learn

### 1. 📱 Interactive Next.js App
Run the actual application with **19 working features**:
```bash
npm run dev
```
Visit: **http://localhost:3000**

### 2. 📚 Documentation Site
Beautiful Docusaurus documentation with detailed guides:
```bash
npm run docs
```
Visit: **http://localhost:3001**

> 💡 **Pro Tip**: Run both simultaneously for the best learning experience!

---

## 📚 What You'll Learn

This project demonstrates **19 complete Next.js features** with working examples:

### 🎨 Rendering Strategies
1. **Server Components** - Default RSC for better performance
2. **Client Components** - Interactive UI with hooks and events
3. **Server-Side Rendering (SSR)** - Dynamic rendering on each request
4. **Static Site Generation (SSG)** - Pre-rendered pages at build time
5. **Incremental Static Regeneration (ISR)** - Static pages that update automatically

### 💾 Data & Mutations
6. **Server Actions** - Server-side form handling without API routes
7. **API Routes** - RESTful API endpoints with Route Handlers
8. **Database Queries** - Server-side database patterns and best practices
9. **TanStack Query** - Powerful client-side data fetching and caching

### 🎭 State Management
10. **Zustand** - Lightweight and fast state management solution

### 🛣️ Routing
11. **Dynamic Routes** - `[id]`, `[...slug]`, and `[[...slug]]` patterns
12. **Parallel Routes** - Render multiple pages simultaneously
13. **Intercepting Routes** - Show modals while preserving URLs
14. **Route Groups** - Organize routes without affecting URLs

### ⚡ Performance & UX
15. **Image Optimization** - Next.js Image component with automatic optimization
16. **Loading States** - Instant loading UI with `loading.tsx` and Suspense
17. **Error Handling** - Graceful error boundaries with `error.tsx`
18. **Metadata API** - SEO-friendly meta tags and Open Graph
19. **Middleware** - Run code before requests complete

## 🏗️ Project Structure

```
nextjs-learning/
├── app/
│   ├── features/
│   │   ├── server-components/      # RSC examples
│   │   ├── client-components/      # Interactive components
│   │   ├── server-actions/         # Form handling demo
│   │   ├── api-routes/             # API documentation
│   │   ├── dynamic-routes/         # Dynamic routing patterns
│   │   ├── ssg/                    # Static generation
│   │   ├── ssr/                    # Server-side rendering
│   │   ├── isr/                    # Incremental regeneration
│   │   ├── image-optimization/     # Image component demo
│   │   ├── metadata/               # SEO metadata
│   │   ├── loading/                # Loading states
│   │   ├── error-handling/         # Error boundaries
│   │   ├── parallel-routes/        # Parallel routing
│   │   ├── intercepting-routes/    # Route interception
│   │   └── route-groups/           # Route organization
│   ├── api/
│   │   └── users/                  # API route examples
│   ├── middleware-demo/            # Middleware demonstration
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page with feature list
│   └── globals.css                 # Global styles
├── components/
│   └── Navigation.tsx              # Main navigation
├── middleware.ts                   # Global middleware
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS config
└── package.json                    # Dependencies

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd nextjs-learning
   ```

2. **Install dependencies:**
   
   > **Note:** If you encounter npm errors, your npm installation may be corrupted. Try one of these alternatives:
   
   ```bash
   # Option 1: Use npm (recommended)
   npm install
   
   # Option 2: Use yarn (if npm fails)
   yarn install
   
   # Option 3: Use pnpm (fastest)
   pnpm install
   
   # Option 4: Reinstall Node.js from https://nodejs.org if all fail
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📖 How to Use This Project

### For Learning:

1. **Start with the Home Page** - Get an overview of all features
2. **Click on Any Feature Card** - See working examples with explanations
3. **Read the Code** - Each file is heavily commented with explanations
4. **Experiment** - Modify the code and see changes in real-time
5. **Check the Console** - Middleware and server logs show execution flow

### Key Learning Path:

**Beginners:**
1. Start with Server Components → Client Components
2. Then Server Actions → API Routes
3. Explore SSG → SSR → ISR (rendering strategies)

**Intermediate:**
4. Dynamic Routes → Loading States → Error Handling
5. Image Optimization → Metadata API

**Advanced:**
6. Parallel Routes → Intercepting Routes → Route Groups
7. Finally, Middleware for request interception

## 🎨 Features Highlights

### 1. Server Components
```tsx
// Default in Next.js - Async components
async function getData() {
  const res = await fetch('...')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.message}</div>
}
```

### 2. Client Components
```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 3. Server Actions
```tsx
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  await db.post.create({ data: { title } })
  revalidatePath('/posts')
}
```

### 4. API Routes
```tsx
// app/api/users/route.ts
export async function GET() {
  const users = await db.user.findMany()
  return NextResponse.json(users)
}
```

### 5. Dynamic Routes
```tsx
// app/posts/[id]/page.tsx
export default function Post({ params }: { params: { id: string } }) {
  return <h1>Post {params.id}</h1>
}
```

## 🛠️ Built With

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🎯 Learning Outcomes

After exploring this project, you'll understand:

- ✅ When to use Server vs Client Components
- ✅ How to implement different rendering strategies (SSG, SSR, ISR)
- ✅ How to build type-safe APIs with Route Handlers
- ✅ How to handle forms with Server Actions
- ✅ How to create complex routing patterns
- ✅ How to optimize images and metadata for performance/SEO
- ✅ How to implement loading states and error boundaries
- ✅ How to use middleware for authentication and redirects
- ✅ How to organize large Next.js applications

## 🔥 Pro Tips

1. **Open Browser DevTools** - Check Network tab, Console, and Response headers
2. **Check the Terminal** - Server logs show when components render
3. **Use React DevTools** - See component tree and Server Component boundaries
4. **Try Hard Refresh** - See the difference between client nav and full reload
5. **Read the Comments** - Code files contain detailed explanations

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a learning project! Feel free to:
- Add more examples
- Improve explanations
- Fix bugs
- Add comments
- Create issues for questions

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for Server Components
- Vercel for excellent documentation

---

**Happy Learning! 🎓**

Start your Next.js journey by running `npm run dev` and visiting `http://localhost:3000`
