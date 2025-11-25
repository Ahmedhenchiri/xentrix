import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    // Await the params to get the actual values
    const { id } = await params
    
    const property = await prisma.property.findUnique({
      where: { id }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params
    const { id } = await params
    const body = await request.json()
    
    const property = await prisma.property.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        address: body.address,
        city: body.city,
        country: body.country,
        postCode: body.postCode,
        propertyReference: body.propertyReference,
        propertyValue: body.propertyValue,
        propertyType: body.propertyType,
        accessProperty: body.accessProperty,
        listingType: body.listingType,
        dimension: body.dimension,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        floors: body.floors,
        parking: body.parking,
        garden: body.garden,
        garage: body.garage,
      }
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    )
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params
    const { id } = await params
    
    await prisma.property.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}