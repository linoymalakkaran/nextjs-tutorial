import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { slug?: string[] } }
) {
  const slug = params.slug || []
  
  // Construct the file path
  let filePath: string
  if (slug.length === 0) {
    // /docs -> /docs/intro/index.html
    filePath = path.join(process.cwd(), 'public', 'docs', 'intro', 'index.html')
  } else {
    // /docs/intro -> /docs/intro/index.html
    const joinedPath = slug.join('/')
    filePath = path.join(process.cwd(), 'public', 'docs', joinedPath, 'index.html')
    
    // If that doesn't exist, try without /index.html
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'public', 'docs', joinedPath)
    }
  }

  try {
    // Read the HTML file
    const html = fs.readFileSync(filePath, 'utf-8')
    
    // Return the HTML with proper content type
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch (error) {
    // If file not found, return 404
    return new Response('Not Found', { status: 404 })
  }
}
