import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirm_password: {
      type: String,
      trim: true,
    },
    years: {
      type: Number,
      required: true,
    },
    // profileImage: {
    //   imageUrl: String,
    //   publicId: String,
    // },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Roles",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const Users = mongoose.model("Users", usersSchema);

export default Users;
