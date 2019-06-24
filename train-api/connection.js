const mongoose = require("mongoose");
const {
  MONGO: { URI }
} = require("./config");

mongoose.set("runValidators", true);
mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => console.log("DB's Connected"))
  .catch(err => console.error(err));
