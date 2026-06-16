import { uploadImage } from "@/services/uploadService";


export const uploadEditorImage = async (file) => {
    const result = await uploadImage(file);
    return {
      success: 1,
      file: {
        url:
          result.file.url,
      },
    };
  };