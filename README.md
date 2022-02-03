# Goods Manager Api

This API was developed to attend a space problem.

## Features
<dl>
  <dt>Clean Architecture</dt>
  <dd>
    This project architecture use principles of <a href="https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html">Clean Architecture</a> focused on codebase scalability.
  </dd>
    
  <dt>Dependency injection</dt>
  <dd>
    Use the technique dependency injection for code not be coupled and make easy to mock dependencies during the tests.
  </dd>
    
  <dt>Web Framework</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/fastify">Fastify</a> for requests routing and middlewares.
  </dd>
  
  <dt>Database</dt>
  <dd>
    Use <a href="https://www.postgresql.org/">Postgres</a> as relational database.
  </dd>
    
  <dt>Database integration</dt>
  <dd>
    <a href="https://www.npmjs.com/package/sequelize">Sequelize</a>, an ORM for SQL databases, is already integrated. But needs to configure some aspects to use it.</a>
  </dd>
  
   <dt>CLI integration</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/sequelize-cli">Sequelize-cli</a> for both the application and Sequelize have command-line tools to make it easy to work with them. Check the <a href="#scripts">Scripts</a> section to know more about this feature.
  </dd>
  
  <dt>Configurations</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/config">Config</a> for easily switch development and test environments, <a href="https://www.npmjs.com/package/config">Dotenv</a> package for loading environmental variables from .env file for config file. And uses <a href="https://www.npmjs.com/package/cross-env">Cross-env</a> to run linux commands style in any OS.
  </dd>
  
  <dt>Instant feedback and reload</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/nodemon">Nodemon</a> to automatically reload the server after a file change when on development mode, makes the development faster and easier.
  </dd>

  <dt>Prepared for testing</dt>
  <dd>
    The test suite uses <a href="https://www.npmjs.com/package/jest">Jest</a> as test runner and is prepared to run unit, integration and functional tests right from the beginning. In integration and functional testes use <a href="https://www.npmjs.com/package/supertest">Supertest</a> to make HTTP tests. There are helpers to make it easy to make requests to the web app during the tests and for cleaning the database after each test</a>.
  </dd>
  
  <dt>Has schema/attributes in entities classes</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/structure">Structure</a> for creating domain entities and map pure objects and JSON to entities classes.
  </dd>
</dl>

## Quick start

0. Do you need a POSTGRES server installed in your machine. I suggest to use this tools: <a href="https://www.electronjs.org/apps/postbird">Postbird</a> for verify your Postgres Database and <a href="https://www.postman.com/">Postman</a> to access the routes of API.
1. Clone the repository with `git clone https://github.com/matheusfcorocher/goods_manager_api.git`
2. Setup the database on `.env` and also `./src/infra/database/config/config.js`.
3. Install the dependencies with `yarn` (click here if [you don't have Yarn installed](https://yarnpkg.com/docs/install)) in your bash terminal
4. Create the development and test databases you have setup on `./src/infra/database/config/config.js`, using command `yarn db:create`. To create database for test, run with option `--env=test` this command.
5. Run the database migrations with `yarn db:migrate`. The default environment is dev. To create database for test, run with option `--env=test` this command.
6. Add some seed data to the development database with `yarn db:seeds`
7. Run the application in development mode with `yarn dev`
8. Access `http://localhost:3333/api/` and you're ready to go!

## Aditional info:
- Don't forget to run the migrations for the test environment as well (including when you create a new migration) with `yarn db:migrate --env=test`

## Scripts

This api comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn <script name>`:

- `db:create`: Run for creating database in your postgres.
- `db:migrate`: Run all migrations for creating the tables in your postgres database.
- `db:migrate:undo:all`: Undone all migrations that created the tables in your postgres database.
- `db:seeds`: Run all seeds for populate tables in your postgres database.
- `db:seeds:undo:all`: Undone all seeds that populated tables in your postgres database.
- `dev`: Run the application in development mode
- `sequelize-cli`: Alias to the [Sequelize CLI](https://github.com/sequelize/cli)
- `test`: Run all tests suite with option --runInBand and NODE_ENV=test

## Endpoints of this api and requirements

1. In postman_files folder has json with all queries of this api. Just import in postman app.
2. Open a bash terminal and run the command `yarn dev`
3. Requirements of project:
    
    3.1 Add pilots and their ships to the system
    You can add pilots and ships in the system with these routes:
        
    This route only add one pilot => `http://localhost:3333//api/pilots/create`. 
        
    The body for the route:  
        
        body:
        {
            "pilotCertification": 1235565,
            "name": "Pilot5",
            "age": 24,
            "credits": 1800,
            "locationPlanet": "Andvari"
        } 
        
        
     This route only add one ship => `http://localhost:3333/api/ships/new`. 
     
     The body for ship the route:   
        
        
        body:
        {
            "pilotCertification": 1235565,
            "fuelCapacity": 1000,
            "fuelLevel": 21,
            "weightCapacity": 700
        }
        

    3.2-) Publish transport contracts
  
      This route only add one pilot => `http://localhost:3333/api/contracts/publish`
      
      The body for the route:
      
        
        body:
        {
            "cargoId": 4,
            "description": "food to Calas",
            "originPlanet": "Andvari",
            "destinationPlanet": "Calas",
            "value": 700
        }
        
        
    3.3-) Travel between planets
        
      This route travel one pilot => `http://localhost:3333/api/pilots/travel/:pilotCertification`
      
      The body for the route:
      
       
        body:
        {
            "destinationPlanet": "Calas",
        }
       

    3.4-) List of open contracts

      You can use the route to see all open contracts => `http://localhost:3333/api/contracts?contractStatus=CREATED`
      
    3.5-) Accept transport contracts

      You can use this route for accept open contracts => `http://localhost:3333/api/contracts/accept/:id`
      
      The body need for this route is below:
      
       body:
        {
            "pilotCertification": 1235867
        }
       
    3.6-) Fulfilling contracts
      
      You can use this route for fulfill a contracts => `http://localhost:3333/api/contracts/fulfill/:idContract`
      
      The body need for this route is below:
       
       body:
        {
          "pilotCertification": 1235867
        }
       
       
    3.7-) Register a refill of the fuel

     You can use this route for refill a ship =>  `http://localhost:3333/api/ships/refill/:pilotCertification`
     
    3.8-) To see all reports:

      You can use this route for see planets reports => `http://localhost:3333/api/reports/planets`

      You can use this route for see pilots reports => `http://localhost:3333/api/reports/pilots`
            
      You can use this route for see transactions reports => `http://localhost:3333/api/reports/transactions`
      
