import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  company: {
    type: String,
    maxLength: 50,
    required: true,
  },
  address: {
    type: String,
    maxLength: 100,
  },
  phone: {
    type: String,
    maxLength: 11,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxLength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       min: 3,
//       max: 20,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 6,
//     },
//     profilePicture: {
//       type: String,
//       default: "",
//     },
//     coverPicture: {
//       type: String,
//       default: "",
//     },
//     followers: {
//       type: Array,
//       default: [],
//     },
//     followings: {
//       type: Array,
//       default: [],
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     desc: {
//       type: String,
//       max: 50,
//     },
//     city: {
//       type: String,
//       max: 50,
//     },
//     from: {
//       type: String,
//       max: 50,
//     },
//     relationship: {
//       type: Number,
//       enum: [1, 2, 3],
//     },
//   },
//   { timestamps: true }
// );

export default mongoose.model("User", UserSchema);
