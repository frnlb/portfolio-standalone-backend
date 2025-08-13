import router from "express";
import type { Router } from "express";

router.use((req, res, next) => {
  next();
});
