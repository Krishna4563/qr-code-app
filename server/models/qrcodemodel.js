const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("qr-code-data", qrCodeSchema);
