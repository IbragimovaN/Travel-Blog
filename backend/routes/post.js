import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
} from "../controllers/post.js";
import { addComment, deleteComment } from "../controllers/comments.js";
import authenticated from "../middelwares/authenticated.js";
import hasRole from "../middelwares/hasRole.js";
import mapPost from "../halpers/mapPost.js";
import mapComment from "../halpers/mapComment.js";
import ROLES from "../constants/roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newPost = await addPost({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imgUrl,
    });
    res.send({ data: mapPost(newPost) });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedPost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imgUrl,
    });

    res.send({ data: mapPost(updatedPost) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ error: null });
  }
);

export default router;
