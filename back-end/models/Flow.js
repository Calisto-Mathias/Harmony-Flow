import mongoose from "mongoose";

const FlowSchema = mongoose.Schema(
  {
    Template: { type: mongoose.ObjectId, required: true },
    Request: { type: String, required: true },
    Status: { type: String, required: true },
    Current: { type: String, required: true },
    Participants: { type: Array, required: true }, //Array Structure will be according to the ERD Diagrams.
    Archived: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Flow = mongoose.model("Flow", FlowSchema);
export default Flow;
