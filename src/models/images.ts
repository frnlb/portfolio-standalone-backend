import type { FieldPacket, ResultSetHeader } from "mysql2";
import { pool } from "../db/index.js";
import type { ImageData, OriginalImageFileData } from "../types/images.ts";
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
    const query = `SELECT * FROM images WHERE filename="${filename}"`;
    const [results, fields] = await pool.query(query);
    return results;
  }

  static async addImagesData(valuesData: string) {
    try {
      const query = `INSERT INTO images (filename, original_size_bytes, 
      file_path) VALUES ${valuesData}`;
      const data = await pool.query(query);
      return data;
    } catch (error) {
      console.error("Error while executing addImagesData: ", error);
      throw error;
    }
  }

  static async addOriginalImagesFileData(originalFilesData: string) {
    if (originalFilesData === "") {
      return "No original files data string";
    }
    const query = `INSERT INTO images 
    (filename, file_path, original_size_bytes)
    VALUES ${originalFilesData};`;
    try {
      const data = await pool.query(query);
      return data;
    } catch (error) {
      console.error(`Error at addImagesFileData - models:
        OriginalFilesData: ${originalFilesData}\n
        Error: ${error}`);
      throw error;
    }
  }

  static async updateImageOptimizedDataByFilename(
    filename: ImageData["filename"],
    optimized_size_bytes: ImageData["optimized_size_bytes"],
    optimized_file_path: ImageData["optimized_file_path"]
  ) {
    try {
      const query = `UPDATE images SET optimized_size_bytes=${optimized_size_bytes}, 
      optimized_file_path="${optimized_file_path}" WHERE filename="${filename}"`;
      const data = await pool.query(query);
      return data;
    } catch (error) {
      console.error(
        `Error while trying to update file\n${filename}\nOptimizedSizeBytes: ${optimized_size_bytes}\nOptimizedFilePath: ${optimized_file_path}`
      );
      throw error;
    }
  }
}
