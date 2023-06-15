# Дипломная работа (backend) movies-explorer-api
---
[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2E6E6FA&lines=Используемые+технологии)](https://git.io/typing-svg)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

---
## Функциональность

- Регистрация
- Авторизация
- Обновление данных пользователя
- Получение информации о пользователе
- Создание и удаление фильма
- Реализован Централизованный обработчик ошибок
- API размещено на отдельном поддомене
- Логирование реализовано цетральным обработчиком

## Роуты

 - запрос на GET /users/me возвращает информацию о пользователе - (email и имя)
 - PATCH /users/me — обновляет информацию о пользователе
 - GET /movies все сохранённые пользователем фильмы
 - POST /movies создаёт фильм с переданными в теле данными
 - DELETE /movies/_id удаляет сохранённый фильм по _id
 - POST /signup создаёт пользователя с переданными в теле данными
 - POST /signin возвращает JWT, если в теле запроса переданы правильные почта и пароль.
 ---
 -  Пользователь не может удалить сохранённую карточку из профиля другого пользователя.
 - Все роуты, кроме /signin и /signup, защищены авторизацией.

 # [Обратиться к серверу](https://api.nemovies.nomoredomains.rocks)

