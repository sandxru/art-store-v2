"use server";

import { createOrder } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_CL_NAME,
  api_key: process.env.NEXT_CL_API_KEY,
  api_secret: process.env.NEXT_CL_SECRET,
});

export async function addOrder(formData: FormData) {
  console.log(formData);

  const photo = formData.get("photo") as File;
  const arrayBuffer = await photo.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        console.log("Error: ", error);
        console.log("Result: ", result);

        const cname = formData.get("cname");
        const delivery: number = Number(formData.get("delivery"));
        const notes = formData.get("notes");
        const photo = result?.secure_url;
        const frameID = Number(formData.get("frameID"));
        const price = Number(formData.get("price"));
        const contact = formData.get("contact");
        const address = formData.get("address");

        createOrder(
          cname,
          delivery,
          notes,
          photo,
          frameID,
          price,
          contact,
          address
        );
      })
      .end(buffer);
  });
}
