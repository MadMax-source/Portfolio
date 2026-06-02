import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Social from '@/models/social.model';

export async function GET() {
  try {
    await connectDB();

    const socials = await Social.find().lean();

    return NextResponse.json(socials);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: 'Failed to fetch socials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const socials = await req.json();

    await Social.deleteMany({});

    await Social.insertMany(socials);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: 'Failed to save socials' }, { status: 500 });
  }
}
