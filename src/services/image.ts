import { ImagesModel } from "../models/images.ts";
import type { ImageData, ImageMetadata } from "../types/images.ts";
export class ImagesService {
  static async getImages() {
    const result = await ImagesModel.getImages();
    return result;
  }

  static async getImagesById(id: ImageData["image_id"]) {
    const result = await ImagesModel.getImagesById(id);
    return result;
  }

  static async getImagesByFilename(filename: ImageData["filename"]) {
    const result = await ImagesModel.getImageByFilename(filename);
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

  static async updateImageByFilename(optimizedImagesMetadata: ImageMetadata[]) {
    let results: any[] = [];
    for (let file of optimizedImagesMetadata) {
      const { filename, filePath, sizeBytes } = file;
      if (filename && filePath && sizeBytes) {
        const result = await ImagesModel.updateImageOptimizedDataByFilename(
          filename,
          sizeBytes,
          filePath
        );
        results = [...results, result];
      }
    }
    return results;
  }

  // static async updateImageOptimizedDataByFilename(
  //   filename: ImageData["filename"],
  //   optimized_size_bytes: ImageData["optimized_size_bytes"],
  //   optimized_file_path: ImageData["optimized_file_path"]
  // ) {
  //   const results = await ImagesModel.updateImageOptimizedDataByFilename(
  //     filename,
  //     optimized_size_bytes,
  //     optimized_file_path
  //   );
  //   return results;
  // }

  static async updateImagesOptimizedDataByFilename(
    optimizedImagesData: {
      filename: ImageData["filename"];
      optimized_size_bytes: ImageData["optimized_size_bytes"];
      optimized_file_path: ImageData["optimized_file_path"];
    }[]
  ) {
    let results: any = [];
    if (!optimizedImagesData || optimizedImagesData.length < 1) {
      console.error(`Error in updateImagesOptimizedDataFilename.
       optimizedImagesData is null or has length 0`);
      return;
    }
    for (let file of optimizedImagesData) {
      const { filename, optimized_size_bytes, optimized_file_path } = file;
      const result = await ImagesModel.updateImageOptimizedDataByFilename(
        filename,
        optimized_size_bytes,
        optimized_file_path
      );

      results = [...results, result];
    }

    return results;
  }

  static async addImagesFileData(imagesFileData: ImageMetadata[]) {
    const length = imagesFileData.length - 1;
    let imagesFileDataString = ``;
    imagesFileData.map(
      ({ filename, filePath, sizeBytes }: ImageMetadata, index) => {
        let fileData = `("${filename}", "${filePath}", ${sizeBytes})${
          index < length ? "," : ""
        }`;
        imagesFileDataString += fileData;
      }
    );
    const result = await ImagesModel.addOriginalImagesFileData(
      imagesFileDataString
    );
    return result;
  }
}
