import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, //указываем что по идентефикатору - id мы ссылаемся на модель User чтобы связать комментарий с пользователем
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
