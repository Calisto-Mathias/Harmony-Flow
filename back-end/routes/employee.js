import express from "express";
import {
  approveFlow,
  getFlowById,
  getFlows,
  rejectFlow,
} from "../controllers/employee/approver.js";

const router = express.Router();

router.get("/flows", getFlows);
router.get("/flowById", getFlowById);
router.patch("/approve", approveFlow);
router.patch("/reject", rejectFlow);

export default router;
