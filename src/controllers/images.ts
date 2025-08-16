import { pool } from "../db/mysql.js";
import { ImagesService } from "../services/image.ts";
import type { ImageData } from "../types/images.js";

// export const bulkAddImages = async((images: Image[]) => {
//   const query =
//     "INSERT INTO images (filename, file_path) VALUES ? ON DUPLICATE KEY UPDATE filename=VALUES(filename)";
//   const result = await pool.execute(query);
//   return result;
// });

// export const addImagesData = async (imagesData: Partial<ImageData>[]) => {
//   let valuesData = "";
//   imagesData.map((imageData: Partial<ImageData>, index) => {
//     const { filename, original_size_bytes, file_path } = imageData;
//     let imageDataValues = `'${filename}', ${original_size_bytes}, '${file_path}'`;
//     return (valuesData += `(${imageDataValues})${
//       index === imagesData.length - 1 ? "" : ","
//     }`);
//   });

//   try {
//     const query = `INSERT INTO images (filename, original_size_bytes, file_path) VALUES ${valuesData}`;
//     const data = await pool.query(query);
//     return data;
//   } catch (error) {
//     console.error("Error while executing addImagesData: ", error);
//     throw error;
//   }
// };

export const addImagesData = async (imagesData: Partial<ImageData>[]) => {
  const result = ImagesService.addImagesData(imagesData);
  return result;
};

export const updateImagesOptimizedDataByFilename = async (
  filename: ImageData["filename"],
  optimized_size_bytes: ImageData["optimized_size_bytes"]
) => {
  const results = await updateImagesOptimizedDataByFilename(
    filename,
    optimized_size_bytes
  );
};
