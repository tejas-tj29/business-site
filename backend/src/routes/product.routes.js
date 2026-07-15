import {Router} from 'express';
import {upload} from '../middleware/multer.middleware.js';

const router = Router();

import { createProduct, getProductsByCompany, deleteProduct } from "../controller/product.controller.js";

router.post("/add", upload.single("image"), createProduct);     
router.get("/all", getProductsByCompany); 
router.delete("/remove/:id", deleteProduct);

export default router;