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

7-)Requirements of project:

1-) Add pilots and their ships to the system

You can add pilots and ships in the system with these routes:

```

This route only add one pilot => /api/pilots/new
body for the route:

body:
{
    "pilotCertification": 1235565,
    "name": "Pilot5",
    "age": 24,
    "credits": 1800,
    "locationPlanet": "Andvari"
} 
This route only add one ship => /api/ships/new
body for ship the route:

body:
{
    "pilotCertification": 1235565,
    "fuelCapacity": 1000,
    "fuelLevel": 21,
    "weightCapacity": 700
}
```

2-) Publish transport contracts

```
This route only add one pilot => /api/contracts/new
body for the route:

body:
{
    "cargoId": 4,
    "description": "food to Calas",
    "originPlanet": "Andvari",
    "destinationPlanet": "Calas",
    "value": 700
}
```

3-) Travel between planets

In the project root, has folder named core_rules has a folder named travel. There show how pilots travels to each planet

4-) List of open contracts

You can use the route to see all open contracts:

```
api/contracts?contractStatus=CREATED
```

5-) Accept transport contracts

You can use this route for accept open contracts:

```
/api/contracts/accept/:id
The body need for this route is below:

body:
{
    "pilotCertification": 1235867
}

```
