import mongoose from "mongoose";

const FlatSchema = new mongoose.Schema(
  {
    flatID: {
      type: Number,
      unique: true,
      required: true
    },
    link: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    space: {
      type: String,
    },
    kaucja: {
      type: Number,
    },
    photos: {
      type: Array,
      default: [],
    },
    czynsz: {
      type: Number,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    rooms: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Flat", FlatSchema);
