'use server'

// Server Actions must have 'use server' directive
// They run on the server and can perform database operations

import { revalidatePath } from 'next/cache'

// Simple in-memory storage for demo (use a real database in production)
let posts: Array<{ id: string; title: string; content: string; createdAt: string }> = []

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // Validate
  if (!title || !content) {
    return {
      message: 'Please fill in all fields',
      posts: posts,
    }
  }

  // Simulate database operation
  const newPost = {
    id: Math.random().toString(36).substring(7),
    title,
    content,
    createdAt: new Date().toISOString(),
  }

  posts.unshift(newPost)

  // Revalidate the page to show updated data
  revalidatePath('/features/server-actions')

  return {
    message: 'Post created successfully!',
    posts: posts,
  }
}

export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string
  
  posts = posts.filter(post => post.id !== id)
  
  // Revalidate the page
  revalidatePath('/features/server-actions')
  
  return { success: true }
}

export async function getPosts() {
  return posts
}
