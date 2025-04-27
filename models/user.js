import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    reqiured: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    reqiured: true,
    default: "Customer"
  },
  isBlocked: {
    type: Boolean,
    reqiured: true,
    default: false
  },
  img: {
    type: String,
    reqiured: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
  },
});

const User = mongoose.model("users", userSchema);

export default User;
