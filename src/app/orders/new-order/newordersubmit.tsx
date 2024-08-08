"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_CL_NAME,
  api_key: process.env.NEXT_CL_API_KEY,
  api_secret: process.env.NEXT_CL_SECRET,
});

export async function addOrder(formData: FormData) {
  console.log(formData);
  console.log("Photo is :" + formData.get("photo"));
  
  const file = formData.get('photo') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer)

  cloudinary.uploader.upload_stream({}).end(buffer)
  
}
