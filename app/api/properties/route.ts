import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
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
        userId:body.userId,  
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}