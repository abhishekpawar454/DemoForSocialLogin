import { mongoose } from "../Index.ts";

interface Task {
  name: string;
  description: string;
  duration: number;
  assignee: string;
  reporter: string;
  isActive: boolean;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    reporter: {
      type: String,
      required: true,
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
const taskModel = mongoose.model<Task>("taskModel", taskSchema);
export { taskModel };
