import { Router } from "express";
import { createProject, getProject } from "../controller/projectController";

const router = Router();

router.get("/", getProject);
router.post("/", createProject);

export default router;
