import Flow from "../../models/Flow.js";
import FlowTemplate from "../../models/FlowTemplate.js";

export const getFlows = async (req, res) => {
  const flows = await Flow.find({
    Current: req.body.employee.Role,
    Archived: false,
  });
  res.status(200).json({ flows });
};

export const getFlowById = async (req, res) => {
  const flow = await Flow.findOne({
    _id: req.body.ID,
    Current: req.body.employee.Role,
    Archived: false,
  });
  if (!flow) {
    return res.status(400).json({
      message: "Invalid Request!",
      description:
        "Request may have failed because of invalid ID or role mismatch!",
    });
  }

  res.status(200).json({ flow });
};

export const approveFlow = async (req, res) => {
  const flow = await Flow.findOne({
    _id: req.body.ID,
    Current: req.body.employee.Role,
    Archived: false,
  });
  if (!flow) {
    return res.status(400).json({
      message: "Invalid Request",
      description:
        "Request may have failed due to non-existence of such a flow or Role Mismatch!",
    });
  }

  flow.Participants = [
    ...flow.Participants,
    [
      req.body.employee._id,
      "Approved",
      req.body.Comment,
      req.body.employee.Role,
    ],
  ];

  const template = await FlowTemplate.findOne({ _id: flow.Template });

  const index = template.Approval_Flow.indexOf(req.body.employee.Role);
  if (index === template.Approval_Flow.length - 1) {
    flow.Archived = true;
    flow.Status = "Finished";
  } else {
    flow.Current = template.Approval_Flow[index + 1];
  }

  await flow.save();
  res
    .status(200)
    .json({ message: `Approved by ${req.body.employee._id}`, flow });
};

export const rejectFlow = async (req, res) => {
  console.log(req.body);
  const flow = await Flow.findOne({
    _id: req.body.ID,
    Current: req.body.employee.Role,
  });
  if (!flow) {
    return res.status(400).json({
      message: "Invalid Request",
      description:
        "Request may have failed due to non-existence of such a flow or Role Mismatch!",
    });
  }

  flow.Participants = [
    ...flow.Participants,
    [
      req.body.employee._id,
      "Rejected",
      req.body.Comment,
      req.body.employee.Role,
    ],
  ];

  flow.Archived = true;
  flow.Status = "Rejected";

  await flow.save();

  res
    .status(200)
    .json({ message: `Rejected By ${req.body.employee._id}`, flow });
};
