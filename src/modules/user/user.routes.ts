import {Router} from "express";
import * as controller from "./user.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/me",authMiddleware,controller.me);

export default router;