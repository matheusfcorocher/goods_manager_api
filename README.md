# goods_manager_api

This API was developed to attend a space's problem

How to run this api:

0-) Do you need a POSTGRES server installed in your machine

Tools sugestions to use this api:

- Postbird => to verify your Postgres Database

* Postman => to access the routes of API

1-)Clone this repository

2-) Open a bash terminal and run this command:

yarn

3-) Verify the .env file in root folder and modify for your case

4-) Run the command yarn db:create for creating database in your postgres.

5-) Run the command yarn db:migrate for run migrations in your database and create the necessary tables.

6-) Run the command yarn db:seeds for run the seed's files to populate the tables.

7-)Testing endpoints of api:
