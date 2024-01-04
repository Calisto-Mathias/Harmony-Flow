import Flow from "../models/Flow.js";
import FlowTemplate from "../models/FlowTemplate.js";

// Students are only allowed to create a Flow and get their created flows. They are in no circumstances allowed to modify their flows, and are not permitted to withdraw them either. For that reason, out of the CRUD operations, in this logic controller, we will only be implementing the CR operations (Create and Read)

export const createFlow = async (req, res) => {
  const { TemplateID, Request } = req.body;

  const template = await FlowTemplate.findOne({ _id: TemplateID });

  if (!template) {
    res.status(400).json({
      message: "Invalid Template Selected!",
      description:
        "The given template ID does not have a corresponding template that exists in the DB!",
    });
  } else {
    const flow = new Flow({
      Template: TemplateID,
      Request: Request,
      Status: "Processing",
      Current: template.Approval_Flow[0],
      Participants: [req.student._id],
    });

    req.body.student.Flows = [...req.body.student.Flows, flow._id];

    await req.body.student.save();
    await flow.save();

    res.status(201).json({
      message: "Successfully Created",
      description: "The required flow has been succesfully created!",
    });
  }
};

export const getFlows = async (req, res) => {
  try {
    const flows = req.body.student.Flows.map(async (item) => {
      const flow = await Flow.findOne({ _id: item });
      if (!flow) {
        throw Error;
      }
      return flow;
    });

    res.status(200).json({ flows });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Flow ID Present",
      description:
        "There is a faulty ID present in the list of flows. Contact Admin Immediately",
    });
  }
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
