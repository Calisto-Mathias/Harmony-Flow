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

export const getTemplates = async (req, res) => {
  const templates = await FlowTemplate.find();
  res.status(200).json({ templates });
};

export const editTemplate = async (req, res) => {
  const { Name, Approval_Flow, ID } = req.body;
  const template = await FlowTemplate.findByIdAndUpdate(
    ID,
    { Name, Approval_Flow },
    { returnDocument: "after" }
  );
  res.status(200).json({ template });
};

export const deleteTemplate = async (req, res) => {
  const { ID } = req.body;
  const template = await FlowTemplate.findByIdAndDelete(ID);

  res.status(200).json({ template });
};
