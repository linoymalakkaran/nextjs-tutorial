---
title: API Routes
---

# API Routes

## Purpose
API Routes in Next.js allow you to build RESTful API endpoints within your Next.js application. They run server-side and can handle HTTP methods like GET, POST, PUT, DELETE, etc.

## Why Use API Routes?

### Benefits
- **Full-Stack in One App**: Build backend and frontend together
- **TypeScript Support**: Share types between frontend and API
- **Serverless by Default**: Deploy as serverless functions
- **Edge Runtime**: Run at the edge for lower latency
- **No CORS Issues**: Same origin as your frontend
- **Easy Authentication**: Use middleware for auth

## When to Use

### ✅ Use API Routes For:
- **External API Integration**: Proxy requests to third-party APIs
- **Webhooks**: Handle webhook callbacks from services
- **Complex Business Logic**: Operations requiring multiple steps
- **Public APIs**: Build REST or GraphQL APIs for mobile apps
- **File Uploads**: Handle multipart form data
- **Rate Limiting**: Implement custom rate limiting logic
- **Authentication Endpoints**: Login, signup, token refresh

### ❌ Don't Use API Routes For:
- **Simple Form Submissions**: Use Server Actions instead
- **Internal Data Fetching**: Use Server Components directly
- **Real-time Communication**: Use WebSockets or Server-Sent Events

## Use Cases

### 1. External API Proxy
```tsx
// app/api/weather/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  
  const response = await fetch(
    `https://api.weather.com/v1/weather?city=${city}&key=${process.env.WEATHER_API_KEY}`
  )
  const data = await response.json()
  
  return Response.json(data)
}
```

### 2. CRUD Operations
```tsx
// app/api/posts/route.ts
export async function GET() {
  const posts = await db.post.findMany()
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = await db.post.create({ data: body })
  return Response.json(post, { status: 201 })
}

// app/api/posts/[id]/route.ts
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const post = await db.post.update({
    where: { id: params.id },
    data: body
  })
  return Response.json(post)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.post.delete({ where: { id: params.id } })
  return new Response(null, { status: 204 })
}
```

### 3. Webhook Handler
```tsx
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    // Handle successful payment
  }
  
  return Response.json({ received: true })
}
```

## HTTP Methods

```tsx
export async function GET(request: Request) {
  // Handle GET requests
}

export async function POST(request: Request) {
  // Handle POST requests
}

export async function PUT(request: Request) {
  // Handle PUT requests
}

export async function PATCH(request: Request) {
  // Handle PATCH requests
}

export async function DELETE(request: Request) {
  // Handle DELETE requests
}

export async function HEAD(request: Request) {
  // Handle HEAD requests
}

export async function OPTIONS(request: Request) {
  // Handle OPTIONS requests
}
```

## Request Handling

### Reading Query Parameters
```tsx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const age = searchParams.get('age')
  
  return Response.json({ name, age })
}
```

### Reading Request Body
```tsx
export async function POST(request: Request) {
  const body = await request.json()
  // body contains parsed JSON
  
  return Response.json({ received: body })
}
```

### Reading Headers
```tsx
import { headers } from 'next/headers'

export async function GET() {
  const headersList = headers()
  const authorization = headersList.get('authorization')
  
  return Response.json({ authorization })
}
```

### Reading Cookies
```tsx
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  
  return Response.json({ token })
}
```

## Response Handling

### JSON Response
```tsx
return Response.json({ message: 'Success' })
```

### Response with Status Code
```tsx
return Response.json(
  { error: 'Not found' },
  { status: 404 }
)
```

### Response with Headers
```tsx
return Response.json(data, {
  status: 200,
  headers: {
    'Cache-Control': 'max-age=3600',
    'Content-Type': 'application/json'
  }
})
```

### Set Cookies
```tsx
import { cookies } from 'next/headers'

export async function POST() {
  cookies().set('token', 'abc123', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  
  return Response.json({ success: true })
}
```

## Error Handling

```tsx
export async function GET(request: Request) {
  try {
    const data = await fetchData()
    return Response.json(data)
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

## Authentication

```tsx
import { verify } from 'jsonwebtoken'

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')
  
  if (!authorization) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const token = authorization.split(' ')[1]
    const decoded = verify(token, process.env.JWT_SECRET!)
    
    // Proceed with authenticated request
    const data = await getUserData(decoded.userId)
    return Response.json(data)
  } catch {
    return Response.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
```

## CORS Configuration

```tsx
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function GET(request: Request) {
  const data = { message: 'Hello' }
  
  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
}
```

## Edge Runtime

```tsx
export const runtime = 'edge'

export async function GET() {
  // This runs at the edge, not on a server
  return Response.json({ message: 'Hello from Edge' })
}
```

## Best Practices

1. **Validate Input**: Always validate and sanitize inputs
2. **Handle Errors**: Provide meaningful error messages
3. **Use Status Codes**: Return appropriate HTTP status codes
4. **Secure Secrets**: Never expose API keys or secrets
5. **Rate Limiting**: Implement rate limiting for public APIs
6. **Use TypeScript**: Type your request/response data
7. **Log Errors**: Log errors for debugging
8. **Cache Responses**: Cache when appropriate

## Comparison

| Feature | API Routes | Server Actions | Server Components |
|---------|-----------|---------------|-------------------|
| Use Case | External APIs | Form mutations | Data fetching |
| Complexity | Higher | Lower | Lowest |
| TypeScript | Manual types | Auto-inferred | Auto-inferred |
| HTTP Methods | All | POST only | None |
| CORS | Configurable | Same-origin | Same-origin |

## Learn More
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Web Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
