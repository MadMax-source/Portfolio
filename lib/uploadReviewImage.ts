import cloudinary from './cloudinary';

export async function uploadReviewImage(file: string) {
  // file = base64 string from frontend

  const result = await cloudinary.uploader.upload(file, {
    folder: 'project-reviews',
    resource_type: 'image',
  });

  return result.secure_url;
}
