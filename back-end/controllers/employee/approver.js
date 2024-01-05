import Flow from "../../models/Flow";

export const getFlows = async (req, res) => {
  const flows = await Flow.find({
    Current: req.employee.Role,
    Archived: false,
  });
  res.status(200).json({ flows });
};

export const getFlowById = async (req, res) => {
  const flow = await Flow.findOne({
    _id: req.ID,
    Current: req.employee.Role,
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
  const flow = await Flow.findOne({ _id: req.ID, Current: req.employee.Role });
  if (!flow) {
    return res.status(400).json({
      message: "Invalid Request",
      description:
        "Request may have failed due to non-existence of such a flow or Role Mismatch!",
    });
  }

  flow.Participants = [
    ...Participants,
    [req.employee._id, "Approved", req.Comment],
  ];

  await flow.save();
  res.status(200).json({ message: `Approved by ${req.employee._id}`, flow });
};

export const rejectFlow = async (req, res) => {
  const flow = await Flow.findOne({ _id: req.ID, Current: req.employee.Role });
  if (!flow) {
    return res.status(400).json({
      message: "Invalid Request",
      description:
        "Request may have failed due to non-existence of such a flow or Role Mismatch!",
    });
  }

  flow.Participants = [
    ...Participants,
    [req.employee._id, "Rejected", req.Comment],
  ];

  flow.Archived = true;

  await flow.save();

  res.status(200).json({ message: `Rejected By ${req.employee._id}`, flow });
};
