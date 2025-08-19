export interface ImageData {
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

export interface OriginalImageFileData {
  filename: ImageData["filename"];
  original_size_bytes: ImageData["original_size_bytes"];
  file_path: ImageData["file_path"];
}

export interface ImageMetadata {
  filename: ImageData["filename"];
  sizeBytes:
    | ImageData["original_size_bytes"]
    | ImageData["optimized_size_bytes"];
  filePath: ImageData["file_path"] | ImageData["optimized_file_path"];
}
