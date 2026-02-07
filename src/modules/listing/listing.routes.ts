import {Router} from "express"
import * as controller from "./listing.controller";

const router = Router();

router.get("/",controller.getAll);
router.post("/",controller.create);
router.post("/:id",controller.update);
router.delete("/id",controller.remove);

export default router;