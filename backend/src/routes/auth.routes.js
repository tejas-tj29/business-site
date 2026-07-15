import {Router} from 'express';

import { registerAdmin, loginAdmin, changeCurrentPassword, refreshAccessToken } from "../controller/auth.controller.js";
import{verifyJWT} from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    registerAdmin
);

router.route("/login").post(
    loginAdmin,
);

router.route("/refresh-token").post(
    refreshAccessToken
);

router.route("/change-password").post(
    verifyJWT,
    changeCurrentPassword
);

export default router;