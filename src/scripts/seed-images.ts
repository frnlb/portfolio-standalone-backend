import fs from "fs";
import path from "path";
import { promisify } from "util";
import {
  addImagesFileData,
  getImages,
  updateImagesOptimizedDataByFilename,
} from "../controllers/images.ts";
import type { ImageData, ImageMetadata } from "../types/images.js";

const stat = promisify(fs.stat);
const IMAGES_DIR = process.env.IMAGES_PATH as string;
console.log("🚀 ~ IMAGES_DIR:", IMAGES_DIR);
const OPTIMIZED_IMAGES_DIR = process.env.OPTIMIZED_IMAGES_PATH as string;
console.log("🚀 ~ OPTIMIZED_IMAGES_DIR:", OPTIMIZED_IMAGES_DIR);

async function getImagesInDb() {
  const existingImages = await getImages();
  return existingImages;
}

const existingImages = await getImagesInDb();

async function getImagesFileData(imagesDir: string): Promise<ImageMetadata[]> {
  const files = fs.readdirSync(imagesDir);
  let imagesData = [];
  for (let file of files) {
    const filePath = path.join(imagesDir, file);
    const filename = path.parse(file).name;
    const fileStats = await stat(filePath);
    if (fileStats.isFile()) {
      const fileData = {
        filename,
        sizeBytes: fileStats.size,
        filePath,
      };

      imagesData.push(fileData);
    }
  }
  return imagesData;
}

async function getExistingImagesInDb() {
  const existingImagesInDb = await getImages();
  return existingImagesInDb as Partial<ImageData>[];
}

function filterExistingImages(
  imagesFolderData: ImageMetadata[],
  imagesDatabaseData: Partial<ImageMetadata>[]
): ImageMetadata[] {
  const existingFilenames = new Set(
    imagesDatabaseData.map((image) => image.filename)
  );
  const filteredImagesToAddInDb = imagesFolderData.filter(
    (image: Partial<ImageData>) => {
      return !existingFilenames.has(image.filename);
    }
  );
  return filteredImagesToAddInDb;
}

async function addImagesData(imagesData: ImageMetadata[]) {
  const result = await addImagesFileData(imagesData);
  return result;
}

async function main() {
  const originalImages = await getImagesFileData(IMAGES_DIR);
  const optimizedImages = await getImagesFileData(OPTIMIZED_IMAGES_DIR);
  const imagesInDb = await getExistingImagesInDb();
  const imagesToBeAddedToDb = filterExistingImages(originalImages, imagesInDb);
  const addImagesDataResult = await addImagesData(imagesToBeAddedToDb);
  const updatedResult = await updateImagesOptimizedDataByFilename(
    optimizedImages
  );
  console.log("🚀 ~ main ~ updatedResult:", updatedResult);
}

main();
