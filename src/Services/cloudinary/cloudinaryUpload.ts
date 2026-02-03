// src/Services/cloudinary/cloudinary.ts
export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  version?: number;
};

const CLOUDINARY_CLOUD_NAME = "dl6h2dkit";
const CLOUDINARY_UPLOAD_PRESET = "AkosCloud";

/**
 * Uploads a file to Cloudinary using unsigned upload preset.
 * NOTE: For production you can also do signed uploads via backend,
 * but unsigned is easiest and still common for avatars.
 */
export async function uploadToCloudinary(file: {
  uri: string;
  name: string;
  type: string;
}): Promise<CloudinaryUploadResult> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "avatars"); // optional

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json()) as any;

  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
    version: data.version,
  };
}
