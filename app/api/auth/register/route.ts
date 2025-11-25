import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body)
    
    // Validate required fields
    const { businessName, officeAddress, postCode, email, password, confirmPassword } = body;

    if (!businessName || !officeAddress || !postCode || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        businessName,
        officeAddress,
        postCode,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        businessName: true,
        email: true,
        officeAddress: true,
        postCode: true,
        createdAt: true,
      }
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}