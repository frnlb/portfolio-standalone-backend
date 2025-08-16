import fs from "fs";
import path from "path";
import { promisify } from "util";
import { addImagesData } from "../controllers/images.ts";
import type { ImageData } from "../types/images.js";

const stat = promisify(fs.stat);
const IMAGES_DIR = process.env.IMAGES_PATH as string;
const OPTIMIZED_IMAGES_DIR = process.env.OPTIMIZED_IMAGES_PATH as string;
const FILE_PATH_PREFIX = "portfolio_images/";

async function getImagesMetadata(
  imagesDir: string
): Promise<Partial<ImageData>[]> {
  try {
    console.log(`🔍 Reading images from directory: ${imagesDir}`);
    const files = fs.readdirSync(imagesDir);

    const imagesToInsert = [];
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileStats = await stat(filePath);

      if (fileStats.isFile()) {
        const imageMetadata = {
          filename: file,
          original_size_bytes: fileStats.size,
          file_path: FILE_PATH_PREFIX + file,
        };
        imagesToInsert.push(imageMetadata);
      }
    }
    console.log(`✅ Found ${imagesToInsert.length} images to process.`);
    return imagesToInsert as Partial<ImageData>[];
  } catch (error) {
    console.error(`❌ Error reading directory or files: ${error}`);
    throw error;
  }
}

async function main() {
  const imagesMetadata = await getImagesMetadata(IMAGES_DIR);
  const optimizedImagesMetadata = await getImagesMetadata(OPTIMIZED_IMAGES_DIR);
  console.log("🖼️  Collected Metadata:", imagesMetadata);
  console.log("🖼️  Collected Metadata:", optimizedImagesMetadata);

  if (imagesMetadata.length > 0) {
    try {
      console.log("Adding images just now.....");
      addImagesData(imagesMetadata);
      console.log("Finished job");
    } catch (error) {
      console.error("There was an error. Nobody knows: ", error);
    }
  } else {
    console.log(
      "There might be an error while trying to retrieve data: imagesMetadata.length: ",
      imagesMetadata.length
    );
  }
}

main();
