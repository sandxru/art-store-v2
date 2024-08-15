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

  await new Promise<void>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          console.error("Error: ", error);
          return reject(error); // Reject the promise on error
        }

        if (result) {
          console.log("Result: ", result);

          const cname = (formData.get("cname") as string) ?? "";
          const delivery = Number(formData.get("delivery")) ?? 0;
          const notes = (formData.get("notes") as string) ?? "";
          const photo = result.secure_url;
          const frameID = Number(formData.get("frameID")) ?? 0;
          const price = Number(formData.get("price")) ?? 0;
          const contact = (formData.get("contact") as string) ?? "";
          const address = (formData.get("address") as string) ?? "";

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
        } else {
          console.error("Upload failed, no result received.");
          return reject(new Error("Upload failed, no result received."));
        }

        resolve(); // Resolve the promise if everything succeeded
      })
      .end(buffer);
  });
}
