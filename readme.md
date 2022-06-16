# MERN Stack

## Express on Heroku - Port 2000

* git init + gitignore
* Express Hello World
  * express
  * nodemon
  * dotenv - PORT
* Deploy to heroku
* Create a react project
  * Build local react
  * setup heroku post build
  * change backend routes to /api/

## React - Port 2200

CRUD - Create, read, update, delete holidays

Login Page - /
Master Page - /holidays/
Detail Page - /holidays/:id

## Mongoose Schema

* Holiday
  * Name - String
  * Likes - Number
  * Celebrated - Boolean
  * Description - String

## CRUD

Create - /holidays/ - POST - /api/holidays/
Read - /holidays - GET - /api/holidays
Read (Secret) - /holidays/:id - GET - /api/holidays/:id

Update - PUT - /api/holidays/:id
Delete - DELETE - /api/holidays/:id

## Security

* Hide Detail Link when not logged in
* Direct access to Detail URL is bounced out

## Big React Libraries for Project

* Component libraries
* Map / Chart / Calendar
* Validation
* React Query
* Form libraries
