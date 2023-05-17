<h1>Тестовое задание</h1>

# Функции API по ТЗ
<ul>
  <li>Регистрация, Авторизация, Выход и Обновление Access и Refresh JWTs</li>
  <li>Записи блога с датой, автором, сообщением ( медиа и текст )</li>
  <li>Пагинация по 20 ( или другому числу ) записей</li>
  <li>Редактирование и Удаление записи автором</li>
  <li>Деплой на Render PostgreSQL db и Exress сервера</li>
  <li>Написание документации</li>
</ul>

# Загрузка

```bash
$ yarn install
```

# Запуск сервера локально

```bash
# development
$ yarn run dev

# production mode
$ yarn run dev
```

# База данных 
###### Если важно увидеть структуру/данные базы данных после выше проделанного 
```bash
$ npx prisma studio
```

# Документация

## Хост сервера
```url
https://testproj-8vvb.onrender.com
```

## Пути и входные/выходные данные

## Авторизация /auth

### Регистрация

```url
# Method
POST
# Short
/registration

# Full Example URL
https://testproj-8vvb.onrender.com/auth/registration
```

### Входные данные
```json
{
  "email": "type: string",
  "password": "type: string; validation: from 3 letters to 32"
}
```

### Выходные данные 
```json
{
  "accessToken":"type: string; need to send with every request in authorization header",
  "refreshToken":"type: string; load to HTTP-only cookie by server",
  "user": {
        "email": "type: string",
        "password": "type: string",
        "user_id": "type: uuid"
    }
}
```

### Авторизация

```url
# Method
POST
# Short
/login

# Full Example URL
https://testproj-8vvb.onrender.com/auth/login
```

### Входные данные
```json
{
  "email": "type: string",
  "password": "type: string; validation: from 3 letters to 32"
}
```

### Выходные данные 
```json
{
  "accessToken":"type: string; need to send with every request in authorization header like a `Bearer ${refreshToken}`",
  "refreshToken":"type: string; load to HTTP-only cookie by server",
  "user": {
        "email": "type: string",
        "password": "type: string",
        "user_id": "type: uuid"
    }
}
```

### Выход из аккаунта

```url
# Method
POST
# Short
/logout

# Full Example URL
https://testproj-8vvb.onrender.com/auth/logout
```

### Входные данные

```json
{
  "user_id": "type: uuid"
}
```

### Выходные данные 

```json
{
  "user_id": "type: uuid",
  "token": "type: string; deleted refresh token"
}
```

### Обновление refresh JWT

```url
# Method
GET
# Short
/refresh

# Full Example URL
https://testproj-8vvb.onrender.com/auth/refresh
```
### Входные данные
```json
{
  "refreshToken": "type: string; it is in cookie already"
}
```

### Выходные данные 
```json
{
  "accessToken":"type: string; need to send with every request in authorization header like a `Bearer ${refreshToken}`",
  "refreshToken":"type: string; load to HTTP-only cookie by server",
  "user": {
        "email": "type: string",
        "password": "type: string",
        "user_id": "type: uuid"
    }
}
```

## Посты /posts

### Получить определенный пост

```url
# Method
GET
# Short
/:post_id

# Full Example URL
https://testproj-8vvb.onrender.com/posts/gfhhjs2j3-jh3k2k-nknbdkf4k-fjbn
```

### Входные данные

```json
{
  "_comment":"it is params"
  "post_id": "type: uuid"
}
```

### Выходные данные 

```json
{
  "post_id": "type: uuid",
  "message": "type: string",
  "media": "type: string[]",
  "user_id": "type: uuid",
  "created_At": "type: Date"
}
```

### Получить посты определенного пользователя

```url
# Method
GET
# Short
/user
# Full Example URL
https://testproj-8vvb.onrender.com/posts/user?limit=30&page=4
```

### Входные данные

```json
{
  "_comment": "it is query params in url",
  "limit": "type: number",
  "page":"type: number",
  "id":"type: uuid"
}
```
### Выходные данные 

```json
[
  {
    "post_id": "type: uuid",
    "message": "type: string",
    "media": "type: string[]",
    "user_id": "type: uuid",
    "created_At": "type: Date"
  }
]
```

### Получить посты

```url
# Method
GET
# Short
/all
# Full Example URL
https://testproj-8vvb.onrender.com/posts/all?limit=20&page=2
```

### Входные данные

```json
{
  "_comment": "it is query params in url",
  "limit": "type: number",
  "page":"type: number",
  "id":"type: uuid"
}
```
### Выходные данные 

```json
[
  {
    "post_id": "type: uuid",
    "message": "type: string",
    "media": "type: string[]",
    "user_id": "type: uuid",
    "created_At": "type: Date"
  }
]
```

### Создание поста

```url
# Method
POST
# Short
/
# Full Example URL
https://testproj-8vvb.onrender.com/posts
```

### Входные данные
```json
{
  "_comment":"it is formdata",
  "body": "type: string; text message; required",
  "id": "type: string; it is user_id; required"
}
```

### Выходные данные 
```json
{
  "post_id": "type: uuid",
  "message": "type: string",
  "media": "type: string[]",
  "user_id": "type: uuid",
  "created_At": "type: Date"
}
```

### Изменение поста

```url
# Method
PATCH
# Short
/
# Full Example URL
https://testproj-8vvb.onrender.com/posts
```

### Входные данные
```json
{
  "":""
}
```
### Выходные данные 
```json
{
  "post_id": "type: uuid",
  "message": "type: string",
  "media": "type: string[]",
  "user_id": "type: uuid",
  "created_At": "type: Date"
}
```

## Обработка ошибок

### Класс ApiError
###### При ошибке будет приходить:

```json 
{
  "message": "type: string; required",
  "errors": "type: string[]; not required"
}
```
