import mongoose from "mongoose";

const FlowTemplateSchema = mongoose.Schema(
  {
    Name: { type: String, required: true },
    Approval_Flow: { type: Array, required: true }, //Consists of an array that will consist of the participant types (by Role) in the necessary order. "Student" role will not be involved in this array as that is a redundant concept and adds computational and storage overhead.
  },
  { timestamps: true }
);

const FlowTemplate = mongoose.model("FlowTemplate", FlowTemplateSchema);
export default FlowTemplate;
