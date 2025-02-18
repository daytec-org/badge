import { Router } from "jsr:@oak/oak/router";
import { plain } from "~/src/router/plain.ts";
import { favicon } from "~/src/router/favicon.ts";

const router = new Router();
router.get("/plain", plain);
router.get("/favicon.ico", favicon);

export default router;
