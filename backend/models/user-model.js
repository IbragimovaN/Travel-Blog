import mongoose from "mongoose";
import ROLES from "../constants/roles.js";

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: ROLES.USER, //по умолчанию пользователь создается с ролью- юзер
    },
  },
  { timestamps: true }
); //так каждому пользователю будет добавлено поле с датой создания и с датой обновления
export default mongoose.model("User", userSchema);
