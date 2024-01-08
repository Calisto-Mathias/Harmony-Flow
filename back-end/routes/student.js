import express from "express";
import {
  createFlow,
  getFlowById,
  getFlows,
  getTemplates,
} from "../controllers/student.js";

const router = express.Router();

router.post("/create", createFlow);
router.get("/flows", getFlows);
router.get("/flowById", getFlowById);
router.get("/templates", getTemplates);

export default router;
