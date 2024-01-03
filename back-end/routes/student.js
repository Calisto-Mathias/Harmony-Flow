import express from "express";
import { createFlow, getFlows } from "../controllers/student.js";

const router = express.Router();

router.post("/create", createFlow);
router.get("/flows", getFlows);

export default router;
