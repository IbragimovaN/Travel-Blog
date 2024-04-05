import Comment from "../models/comments-model.js";
import Post from "../models/post-model.js";
//add
async function addComment(postId, comment) {
  const newComment = await Comment.create(comment); //создаем комментарий

  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }); //находим пост и обновляем втсавив комментарий. с помощью $push мы просим добавить в массив. далее пишем в какой и что добавить

  await newComment.populate("author"); //нам нужно чтобы вместо id пользователя передавать на фронтенд его логин, для этого используем populate тк в схеме мы писали что комментарии связаны с пользователями, мы с помощью populate просим mongoose превратить поле id автора в логин

  return newComment;
}
//delete
async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }); //удаляем комментарий из поста $pull позволяет убрать элемент из массива
}

export { addComment, deleteComment };
