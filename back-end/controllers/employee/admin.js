import mongoose from "mongoose";
import FlowTemplate from "../../models/FlowTemplate.js";

export const createTemplate = async (req, res) => {
  const { Name, Approval_Flow } = req.body;
  const template = new FlowTemplate({
    Name,
    Approval_Flow,
  });

  template.save();
  res.status(201).json({
    message: "Successfully Created!",
    description: "Successfully created the admin's template.",
    template: template._doc,
  });
};
