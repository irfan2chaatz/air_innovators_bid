import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], // Add roles as needed
      default: "USER",
    }
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

userSchema.methods.generateAccessToken = function () {
  let jwtPayload = {
    userId: this._id,
  };

  return jwt.sign(jwtPayload, CONFIG.JWT_SECRET_KEY, { expiresIn: "1d" });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, CONFIG.SALT_ROUNDS);
  next();
});

userSchema.post("save", (doc, next) => {
  console.log("-----------Running after saving to db");
  console.log(doc);
  console.log("------------------------------");
  next();
});

userSchema.methods.isPasswordCorrect = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  let jwtPayload = { userId: this._id };
  let token = jwt.sign(jwtPayload, CONFIG.JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
};

export default mongoose.model("User", userSchema, "users");
