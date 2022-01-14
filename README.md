# goods_manager_api

This API was developed to attend a space problem

How to run this api:

0-) Do you need a POSTGRES server installed in your machine

Tools sugestions to use this api:

- Postbird => to verify your Postgres Database

* Postman => to access the routes of API

1-)Clone this repository

1.1-) In postman_files folder has json with all queries of this api. Just import in postman app.

2-) Open a bash terminal and run this command:

```
yarn
```

3-) Verify the .env file in root folder and modify for your case

4-) Run this command below for creating database in your postgres.

```
yarn db:create
```

5-) Run this command below for run migrations in your database and create the necessary tables.

```
yarn db:migrate
```

6-) Run this command below for run the seed's files to populate the tables.

```
yarn db:seeds
```

7-)Requirements of project:

1-) Add pilots and their ships to the system

You can add pilots and ships in the system with these routes:

```

This route only add one pilot => /api/pilots/create
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
This route only add one pilot => /api/contracts/publish
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

```
This route travel one pilot => /api/pilots/travel/:pilotCertification
body for the route:

body:
{
    "destinationPlanet": "Calas",
}
```

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

6-) Fulfilling contracts

* [ ] You can use this route for fulfill a contracts:

```
/api/contracts/fulfill/:idContract
The body need for this route is below:

body:
{
    "pilotCertification": 1235867
}

```

7-) Register a refill of the fuel

* [ ] You can use this route for refill a ship:

```
/api/ships/refill/:pilotCertification
```

8-) To see all reports:

* [ ] You can use this route for see planets reports:

```
/api/reports/planets
```

* [ ] You can use this route for see pilots reports:

```
/api/reports/pilots
```

* [ ] You can use this route for see transactions reports:

```
/api/reports/transactions
```
