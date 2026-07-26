const mongoose = require("mongoose");

const noteSectionSchema =
  new mongoose.Schema(
    {
      heading: {
        type: String,
        required: true,
        trim: true,
      },

      points: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
    },
    {
      _id: false,
    }
  );

const noteSchema = new mongoose.Schema(
  {
    pdfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PDF",
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      default: "AI Generated Notes",
      trim: true,
    },

    notes: {
      type: [noteSectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Note",
  noteSchema
);