import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const originalImagesDir = process.env.IMAGES_PATH;
const optimizedImagesDir = process.env.OPTIMIZED_IMAGES_PATH;

async function optimizeImages() {
  if (!originalImagesDir || !optimizedImagesDir) {
    console.error(
      "Error: ORIGINAL_IMAGES_PATH and OPTIMIZED_IMAGES_PATH environment variables must be set."
    );
    process.exit(1);
  }

  try {
    await fs.mkdir(optimizedImagesDir, { recursive: true });
    const files = await fs.readdir(originalImagesDir);
    console.log(`Found ${files.length} files. Starting optimization...`);

    const imageExtensions = [".jpg", ".jpeg", ".png"];

    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase();
      if (imageExtensions.includes(fileExtension)) {
        const originalImagePath = path.join(originalImagesDir, file);
        const newFilename = `${path.parse(file).name}.webp`;
        const optimizedImagePath = path.join(optimizedImagesDir, newFilename);

        // A. Get the original file stats to retrieve the size
        const originalStats = await fs.stat(originalImagePath);
        const originalSize = originalStats.size;

        const image = sharp(originalImagePath);
        await image
          .resize(800)
          .webp({ quality: 80 })
          .toFile(optimizedImagePath);

        const stats = await fs.stat(optimizedImagePath);
        const optimizedSize = stats.size;

        console.log(`Successfully processed ${file}:`);
        // B. Log the original size from the file stats
        console.log(`- Original Size: ${originalSize} bytes`);
        console.log(`- Optimized Size: ${optimizedSize} bytes`);
        console.log(`- Saved to: ${optimizedImagePath}`);
      }
    }
    console.log(`Image optimization complete in ${optimizedImagesDir}`);
  } catch (error) {
    console.error(`Error while optimizing images: ${error}`);
  }
}

optimizeImages();
