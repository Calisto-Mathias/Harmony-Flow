import Flow from "../models/Flow.js";
import FlowTemplate from "../models/FlowTemplate.js";

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
