import express, { json } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const DB_PASSD = process.env.DB_PASSD;
import "dotenv/config";
const PORT = 3000;
const app = express();
app.use(json());
const uri = `mongodb+srv://recluzedev:${DB_PASSD}@user.eruveun.mongodb.net/image-processing-service?retryWrites=true&w=majority`;

// Database Connection
mongoose
  .connect(uri)
  .then(() => console.log(" Successfully connected to MongoDB via Mongoose"))
  .catch((err) => console.error(" MongoDB connection error:", err));
// Schema of database
let UserSchemaRegister = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// let UserSchemaLogin = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// const UserLogin = mongoose.model("UserLogin", UserSchemaLogin);
const User = mongoose.model("User", UserSchemaRegister);

app.get("/", (req, res) => {
  res.send("Iam dashboard");
});

app.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  const id = newUser.id;

  await newUser.save();

  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(JWT_SECRET);
  const jwt_data = jwt.sign({ user_id: id }, JWT_SECRET, {
    expiresIn: "1hr",
  });
  return res.status(201).json({ data: jwt_data });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const isMatch = password === user.password;
  if (isMatch) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const id = user.id;
    const jwt_data = jwt.sign({ user_id: id }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    return res.status(201).json({ data: jwt_data });
  }
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT} `);
});
