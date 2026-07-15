import {Router} from 'express';
import {upload} from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

import { createProduct, getProductsByCompany, deleteProduct } from "../controller/product.controller.js";

router.post("/add", verifyJWT, upload.single("image"), createProduct);     
router.get("/all", getProductsByCompany); 
router.delete("/remove/:id", verifyJWT, deleteProduct);

export default router;