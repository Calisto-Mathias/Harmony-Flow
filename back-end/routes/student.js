import express from "express";
import { createFlow, getFlowById, getFlows } from "../controllers/student.js";

const router = express.Router();

router.post("/create", createFlow);
router.get("/flows", getFlows);
router.get("/flowById", getFlowById);

export default router;
