import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    // changePassword, 
    getCurrentUser, 
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT,logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT,changePassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)

export default router