import mongoose from "mongoose";
const { Schema } = mongoose;

const rolesSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);
const Roles = mongoose.model("Roles", rolesSchema);
export default Roles;
