import { ImagesService } from "../services/image.ts";
import type { ImageData, ImageMetadata } from "../types/images.js";

export const getImages = async () => {
  const result = ImagesService.getImages();
  return result;
};

export const addImagesData = async (imagesData: Partial<ImageData>[]) => {
  const result = ImagesService.addImagesData(imagesData);
  return result;
};

export const addImagesFileData = async (imagesMetadata: ImageMetadata[]) => {
  const result = await ImagesService.addImagesFileData(imagesMetadata);
  return result;
};

export const updateImagesOptimizedDataByFilename = async (
  optimizedImagesMetadata: ImageMetadata[]
) => {
  const result = await ImagesService.updateImageByFilename(
    optimizedImagesMetadata
  );
  return result;
};

// export const updateImagesWithOptimizedInfo = async (
//   optimizedImages: Partial<ImageData>[]
// ) => {
//   let results: { filename: ImageData["filename"]; result: any }[] | [] = [];
//   for (let file of optimizedImages) {
//     console.log(file);
//     try {
//       const result = await updateImagesOptimizedDataByFilename(
//         file.filename as ImageData["filename"],
//         file.original_size_bytes as ImageData["optimized_size_bytes"],
//         file.file_path as ImageData["optimized_file_path"]
//       );
//       if (file.filename && result) {
//         results = [...results, { filename: file.filename, result }];
//       }
//     } catch (error) {
//       console.error(`Error while trying to updateImagesData: ${error}`);
//       throw error;
//     }
//   }
//   return results;
// };
