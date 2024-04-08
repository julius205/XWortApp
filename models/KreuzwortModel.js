const mongoose = require("mongoose");

// Check if the model already exists before defining it
const KreuzwortModel =
  mongoose.models.KreuzwortModel ||
  mongoose.model(
    "KreuzwortModel",
    new mongoose.Schema({
      frage: {
        type: String,
        required: true,
      },
      antworten: {
        type: [String],
        required: true,
      },
    })
  );

module.exports = KreuzwortModel;
