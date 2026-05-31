import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/review.model';
import { uploadReviewImage } from '@/lib/uploadReviewImage';
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');

  let reviews;

  if (projectId) {
    reviews = await Review.find({ projectId }).sort({
      createdAt: -1,
    });
  } else {
    reviews = await Review.find().sort({
      createdAt: -1,
    });
  }

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const { projectId, name, position, review, rating, image } = body;

  let imageUrl = null;

  // upload to cloudinary if image exists
  if (image) {
    imageUrl = await uploadReviewImage(image);
  }

  const newReview = await Review.create({
    projectId,
    name,
    position,
    review,
    rating,
    imageUrl,
  });

  return NextResponse.json(newReview);
}
