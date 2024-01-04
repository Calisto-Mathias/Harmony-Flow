import express from "express";
import {
  createTemplate,
  deleteTemplate,
  editTemplate,
  getTemplateById,
  getTemplates,
} from "../controllers/employee/admin.js";

const router = express.Router();

router.post("/create", createTemplate);
router.get("/templates", getTemplates);
router.get("/templatesById", getTemplateById);
router.put("/edit", editTemplate);
router.delete("/delete", deleteTemplate);

export default router;
