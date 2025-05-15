import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!"],
    required: [true, "Email is required!"]
  },
  username: {
    type: String,
    required: [true, "Username is required!"]
  },
  image: {
    type: String
  }
});

// This is going to be called every single time
// Check if the model is already exists
// If it is, use it, if not create a new one
const User = models.User || model("User", UserSchema);
export default User;
