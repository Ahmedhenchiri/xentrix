import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 2MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `property-${timestamp}.${extension}`
    
    // Create uploads directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(publicDir, { recursive: true })
    } catch (error) {
      // Directory already exists
    }
    
    // Save file
    const filepath = path.join(publicDir, filename)
    await writeFile(filepath, buffer)
    
    // Return the public URL
    const imageUrl = `/uploads/${filename}`
    
    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}