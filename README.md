# Travel-Blog

Области хранения данных:

- база данных (Json-server)
- BFF
  -редакс стор

Сущности приложения:

1. пользователь. данные о нем в БД (в списке пользоваетлей), в BFF (текущая сессия), стор (отображение в браузере)
2. роль пользователя. в БД (список ролей) в BFF (текущая сессия пользователя с ролью), стор (использование на клиенте)
3. статья. в БД (список статей), стор (отображение в браузере)
4. комментарии. в БД (список комментариев), стор (отображение в браузере)

Таблицв БД:

- пользователи - userd: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / pablished_at
- комментарии - comments: id / author_id / post_id / content / pablished_at

Схема состояния на BFF

- сессия текущего пользователя login / password / role

Схема для redux-store на клиента

user: id /login / roleId /
posts: массив из post: id / title / imgUrl / publishedAt / commentsCount
post: id / title / imgUrl / content / comments: массив comment: id / author / content / publishedAt
users: массив user: id / login / registeredAt / role

https://aristeya.com.ua/wp-content/uploads/2017/01/1366x400_srilaanka_tcm359-142378.jpg
