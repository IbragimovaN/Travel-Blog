export default function (comment) {
  return {
    content: comment.content,
    author: comment.author.login,
    id: comment._id,
    publishedAt: comment.createdAt
      .toISOString()
      .substring(0, 16)
      .replace("T", " "),
  };
}
