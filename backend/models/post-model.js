import mongoose from "mongoose";
import validator from "validator";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId, //указываем что по идентефикатору - id мы ссылаемся на модель Comment чтобы связать посто с комментариям, тк комментариев может быть несколько, указываем массив
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
