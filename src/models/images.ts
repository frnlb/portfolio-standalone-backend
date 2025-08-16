import type { FieldPacket, ResultSetHeader } from "mysql2";
import { pool } from "../db/index.js";
import type { ImageData } from "../types/images.ts";
/**
 * export interface ImageData {
  image_id: string;
  filename: string;
  description: string;
  original_size_bytes: number;
  optimized_size_bytes: number;
  file_path: string;
  optimized_file_path: string;
  upload_date: string;
  last_modified_date: string;
  location_id: string;
}
 */
export class ImagesModel {
  static async getImages() {
    const query = `SELECT * FROM images`;
    const [results, fields] = await pool.query(query);
    return results;
  }

  static async getImagesById(id: ImageData["image_id"]) {
    const query = `SELECT * FROM images WHERE image_id=${id}`;
    const [results, fields] = await pool.query(query);
    return results;
  }

  static async getImageByFilename(filename: ImageData["filename"]) {
    const query = `SELECT * FROM images WHERE filename=${filename}`;
    const [results, fields] = await pool.query(query);
    return results;
  }

  //   static async updateImageDescriptionById(image: Partial<ImageData>) {
  // const {
  //   image_id,
  //   filename,
  //   description,
  //   original_size_bytes,
  //   optimized_size_bytes,
  //   file_path,
  //   optimized_file_path,
  //   upload_date,
  //   last_modified_date,
  //   location_id,
  // } = image;

  //     const query = `UPDATE images SET description=${description} `;
  //   }

  static async updateImagesOptimizedDataByFilename(
    filename: ImageData["filename"],
    optimized_size_bytes: ImageData["optimized_size_bytes"]
  ) {
    const query = `UPDATE images SET optimized_size_bytes=${optimized_size_bytes} WHERE filename=${filename}`;
    try {
      const [result] = (await pool.query(query)) as [
        ResultSetHeader,
        FieldPacket[]
      ];
      if (result.affectedRows > 0) {
        return {
          success: true,
          message: `Updated image ${filename}`,
          details: result,
        };
      } else {
        return {
          success: false,
          message: `Error. Image ${filename} not updated`,
        };
      }
    } catch (error) {
      console.error(`Error while trying to update ${filename}: ${error}`);
      throw error;
    }
  }

  static async updateImageByFilename(filename: ImageData["filename"]) {}

  static async addImagesData(valuesData: string) {
    try {
      const query = `INSERT INTO images (filename, original_size_bytes, file_path) VALUES ${valuesData}`;
      const data = await pool.query(query);
      return data;
    } catch (error) {
      console.error("Error while executing addImagesData: ", error);
      throw error;
    }
  }
}
