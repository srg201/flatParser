import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    tg_id: {
      type: Number,
      unique: true
    },
    push: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
