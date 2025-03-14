import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    username: string;
    role: "customer" | "vendor";
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    role: {type: String, enum: ["customer", "vendor"], required: true},
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);