import express from "express";
import mapUser from "../halpers/mapUser.js";
import { register, login } from "../controllers/user.js";

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true }) // добавим httpOnly чтобы не было доступа из js
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Неизвестная ошибка" });
  }
});

router.post("/logout", (req, res) => {
  //контроллер не нужен -просто очищаем токен из куки
  res.cookie("token", "", { httpOnly: true }).send({});
});

export default router;
