import Flow from "../models/Flow.js";
import FlowTemplate from "../models/FlowTemplate.js";

// Students are only allowed to create a Flow and get their created flows. They are in no circumstances allowed to modify their flows, and are not permitted to withdraw them either. For that reason, out of the CRUD operations, in this logic controller, we will only be implementing the CR operations (Create and Read)

export const createFlow = async (req, res) => {
  const { TemplateID, Request } = req.body;

  const template = await FlowTemplate.findOne({ _id: TemplateID });

  if (!template) {
    return res.status(400).json({
      message: "Invalid Template Selected!",
      description:
        "The given template ID does not have a corresponding template that exists in the DB!",
    });
  }
  const flow = new Flow({
    Template: TemplateID,
    Request: Request,
    Status: "Processing",
    Current: template.Approval_Flow[0],
    Participants: [
      [req.body.student._id, "Created", "Created by Student", "Student"],
    ],
    Archived: false,
  });

  req.body.student.Flows = [...req.body.student.Flows, flow._id];

  await req.body.student.save();
  await flow.save();

  res.status(201).json({
    message: "Successfully Created",
    description: "The required flow has been succesfully created!",
  });
};

export const getFlows = async (req, res) => {
  const flows = [];
  for (let i = 0; i < req.body.student.Flows.length; i++) {
    console.log(req.body.student);
    const flow = await Flow.findOne({ _id: req.body.student.Flows[i] });
    if (!flow) {
      return res
        .status(400)
        .json({ message: "Invalid Flow ID", description: "Contact Admin!" });
    }
    flows.push(flow);
  }

  return res.status(200).json({ flows });
};

export const getFlowById = async (req, res) => {
  const flow = await Flow.findById(req.body.ID);
  if (!flow) {
    return res.status(404).json({
      message: "Invalid Flow Request",
      description: "The Given Flow Does Not exist in the DB.",
    });
  }

  return res.status(200).json({ flow: flow._doc });
};
export const getTemplates = async (req, res) => {
  const templates = await FlowTemplate.find();
  res.status(200).json({ templates });
};
