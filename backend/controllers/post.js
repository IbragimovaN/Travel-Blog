import Post from "../models/post-model.js";

//add
async function addPost(post) {
  const newPost = await Post.create(post);

  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

//edit
async function editPost(id, post) {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

//delete
async function deletePost(id) {
  return Post.deleteOne({ _id: id });
}
//get list with search and pagination
async function getPosts(search = "", limit = 10, page = 1) {
  //первый аргумент поиск, второй кол-во элементов на странице, третий - номер начальной страницы
  //будем делать сразу 2 запроса - на поиск и на парнацию, поэтому используем PromiseAll

  const [posts, count] = await Promise.all([
    //чтобы искать по како-то кусочку текста а не по полному совпадению - используем регулярные выражения
    //i - регистронезависимость
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit) //указываем лимит постов
      .skip((page - 1) * limit) //расчитываем сколько постов надо пропустить в зависимости от текущей страницы
      .sort({ createdAt: -1 }), //чтобы новын посты были сверху. указываем сориторку по убыванию, если бы указал вместо -1 просто 1 это было бы по возрастанию
    Post.countDocuments({ title: { $regex: search, $options: "i" } }), //фильтруем посты и считаем сколь их вообще
  ]);
  return {
    posts,
    lastPage: Math.ceil(count / limit), //чтобы узнать номер последней страницы делим кол-во постов на лимит и округляем вверх
  };
}

//get item
function getPost(id) {
  return Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

export { addPost, editPost, deletePost, getPost, getPosts };
