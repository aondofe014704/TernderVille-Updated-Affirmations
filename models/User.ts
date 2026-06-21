/**
 * User model.
 *
 * Role tiers:
 *   - "admin"        — standard admin (created by seed-admin.ts)
 *   - "super_admin"  — legacy tier from the original Express app, still accepted
 *   - "user"         — regular user
 *
 * For permission checks, use isAdminRole() from lib/auth.ts which treats
 * both admin and super_admin as admin-equivalent.
 */
import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "user" | "admin" | "super_admin";

export interface IUser extends Document {
  email: string;
  phone: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["user", "admin", "super_admin"], default: "user", index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default User;
