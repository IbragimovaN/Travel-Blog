# Travel-Blog (учебный проект)

**Описание проекта**  
Travel-Blog — это учебный проект блога путешественника. Пользователи могут регистрироваться, входить в систему, создавать посты и оставлять комментарии (только для зарегистрированных пользователей). Редактировать можно только свои посты.  

Проект включает:  
- Поиск по заголовкам постов  
- Пагинацию (разбивку на страницы)  
- Отображение погоды в текущем городе пользователя  
- Административную панель для управления пользователями (роли: Admin, Moderator, User)  

**Функционал**  
- Регистрация и авторизация пользователей  
- Создание, редактирование и удаление постов  
- Добавление и удаление комментариев  
- Поиск по постам с фильтрацией  
- Адаптивный интерфейс  
- Защищённые маршруты (доступ по ролям)  

## Стек технологий  

**Backend**  
- Node.js + Express  
- MongoDB (Mongoose для моделей)  
- JWT-аутентификация  
- REST API  
- Валидация данных (validator.js)  
- Bcrypt для хеширования паролей
- Docker для разветывания 

**Frontend**  
- React.js (SPA)  
- Redux (управление состоянием)  
- React Router (навигация)  
- Styled Components (стилизация)  
- React Hook Form + Yup (валидация форм)  
- Адаптивная вёрстка

## Установка и запуск
Понадобится файл .env в папке backend

MONGODB_CONNECTION_STRING=your_mongodb_connection
JWT_SECRET=your_strong_jwt_secret

### Запуск через Docker
```bash
docker build -t travel-blog .
docker run -p 3004:3004 --env-file .env travel-blog

## Ручная установка

### Backend:

```bash
cd backend
npm install
npm run serve

### Frontend:

```bash
cd frontend
npm install
npm run dev



<img width="1668" height="878" alt="travel-blog" src="https://github.com/user-attachments/assets/be5063f6-ddc8-44ef-9702-96c5a3676189" />


<img width="1504" height="883" alt="travel-blog2" src="https://github.com/user-attachments/assets/5ffa6975-5b77-4140-b39c-c02e189fcef6" />


<img width="1508" height="883" alt="travel-blog3" src="https://github.com/user-attachments/assets/7ddca854-c970-47a1-80ea-2bdccfc0cf0b" />

