import { mongoose } from "../Index.ts";

interface User {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  image: string;
  dateOfBirth: Date;
  otp: number | null;
  isActive: boolean;
  isDelete: boolean;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    isDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model<User>("userModel", userSchema);
export { userModel };
