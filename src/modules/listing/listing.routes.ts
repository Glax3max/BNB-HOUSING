import {Router} from "express"
import * as controller from "./listing.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { requireHost } from "../../shared/middleware/role.middleware";

const router = Router();

router.get("/",controller.getAll);

// Protected routes
router.post("/",authMiddleware,requireHost,controller.create);
router.post("/:id",authMiddleware,requireHost,controller.update);
router.delete("/id",authMiddleware,requireHost,controller.remove);

export default router;