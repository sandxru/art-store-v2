"use server";
import { updateOrder } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function addOrder(formData: FormData) {
  console.log(formData);

  const photo = formData.get("photo") as File;

  if (!(photo instanceof File) || !photo.size || photo.name === "undefined") {
    console.log("No Photo Selected");
    const id = Number(formData.get("id"));
    const cname = formData.get("cname") as string;
    const delivery = Number(formData.get("delivery"));
    const notes = formData.get("notes") as string;
    const photo = undefined;
    const frameID = Number(formData.get("frameID"));
    const price = Number(formData.get("price"));
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;

    updateOrder(
      id,
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
    console.log("New Photo Selected");
    const oldphoto = formData.get("oldphoto") as string;
    const publicid = oldphoto.split("/").slice(-1)[0].split(".")[0];
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

            // Attempt to delete the old photo
            try {
              cloudinary.uploader.destroy(publicid);
              console.log("Photo Deleted: " + publicid);
            } catch (deleteError) {
              console.error("Failed to delete old photo: ", deleteError);
              // Continue without interrupting the process
            }

            const id = Number(formData.get("id"));
            const cname = formData.get("cname") as string;
            const delivery = Number(formData.get("delivery"));
            const notes = formData.get("notes") as string;
            const photo = result.secure_url;
            const frameID = Number(formData.get("frameID"));
            const price = Number(formData.get("price"));
            const contact = formData.get("contact") as string;
            const address = formData.get("address") as string;

            updateOrder(
              id,
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
}
