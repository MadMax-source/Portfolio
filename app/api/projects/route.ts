import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import Project from '@/models/project.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      longDescription,
      category,
      technologies,
      liveUrl,
      githubUrl,
      features,
      challenges,
      duration,
      role,
      imagePreview,
    } = body;

    let uploadedImage = null;

    if (imagePreview) {
      uploadedImage = await cloudinary.uploader.upload(imagePreview, {
        folder: 'portfolio-projects',
      });
    }

    const project = await Project.create({
      title,
      description,
      longDescription,
      category,
      technologies,
      liveUrl,
      githubUrl,
      features,
      challenges,
      duration,
      role,
      imageUrl: uploadedImage?.secure_url || '',
      imagePublicId: uploadedImage?.public_id || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Project uploaded successfully',
        data: project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to upload project',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
      },
      { status: 500 },
    );
  }
}
