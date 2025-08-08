import { pool } from "../db/mysql.js";
import type { Image } from "../types/images.js";

// export const bulkAddImages = async((images: Image[]) => {
//   const query =
//     "INSERT INTO images (filename, file_path) VALUES ? ON DUPLICATE KEY UPDATE filename=VALUES(filename)";
//   const result = await pool.execute(query);
//   return result;
// });
