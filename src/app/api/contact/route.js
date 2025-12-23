import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Lead from '@/app/models/leadmodels';

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, email, phone, propertyValue, monthlySalary } = await request.json();

    // Save to MongoDB
    const newLead = new Lead({
      name,
      email,
      phone,
      propertyValue,
      monthlySalary
    });

    await newLead.save();

    console.log('Lead saved to MongoDB:', { name, email });

    return NextResponse.json({
      "status": "success",
      "message": "Lead received"
    }, { status: 200 });

  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}
