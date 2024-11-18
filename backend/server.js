const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRoute = require("./routes/userRoute");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", UserRoute);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
