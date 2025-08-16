import { ImagesModel } from "../models/images.ts";
import type { ImageData } from "../types/images.ts";

export class ImagesService {
  static async updateImageFilenameOptimizedBytes(
    filename: ImageData["filename"],
    optimized_size_bytes: ImageData["optimized_size_bytes"]
  ) {
    const result = await ImagesModel.updateImagesOptimizedDataByFilename(
      filename,
      optimized_size_bytes
    );
    return result;
  }

  static async addImagesData(imagesData: Partial<ImageData>[]) {
    let valuesData = "";
    imagesData.map((imageData: Partial<ImageData>, index) => {
      const { filename, original_size_bytes, file_path } = imageData;
      let imageDataValues = `'${filename}', ${original_size_bytes}, '${file_path}'`;
      return (valuesData += `(${imageDataValues})${
        index === imagesData.length - 1 ? "" : ","
      }`);
    });

    const result = ImagesModel.addImagesData(valuesData);
    return result;
  }
}
