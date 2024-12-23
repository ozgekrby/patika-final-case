import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import ROLES from "ok-backend-common/constants/roles.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
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
    roles: {
      type: [String],
      default: [ROLES.USER, ROLES.ADMIN],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.ROLES = ROLES;

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.isAdmin = async function () {
  return this.roles.includes(this.constructor.ROLES.ADMIN);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", UserSchema);

export default User;
