import express from "express";
import { createTemplate } from "../controllers/employee/admin.js";

const router = express.Router();

router.post("/create", createTemplate);

export default router;
