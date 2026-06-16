const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/v1/upload/editor-image`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Image upload failed"
    );
  }

  return await response.json();
};