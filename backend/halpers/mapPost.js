import mongoose from "mongoose";
import mapComment from "./mapComment.js";

export default function (post) {
  return {
    id: post.id,
    title: post.title,
    imgUrl: post.image,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    publishedAt: post.createdAt
      .toISOString()
      .substring(0, 16)
      .replace("T", " "),
  };
}
