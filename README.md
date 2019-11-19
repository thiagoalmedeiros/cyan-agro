# Cyan Agro

This repository addresses the proposed challenge for Cyan Agro recruitment.


## Installation

### Configuring database
Before running our project we will need to install Nodejs and Docker for use with Postgres.

First of all, you need to configure the database to be used for demo.
If you prefer to use the database on your machine, change the file ```database/config.json``` to use the desired database, make sure you have installed the PostGis extension.

If you have not installed, feel free to use the docker-compose present in this project. To do so, go to the Docker [site] (https://www.docker.com/products/docker-desktop) and install according to your platform.

Once installed run the command at the root of the project:

```
docker-compose up -d
```

Once executed, go to [link](http://localhost:16543) to enter the pgadmin dashboard the password and user must be ```admin```, ```admin``` respectively. Use "db-postgres-compose" as hostname to create database server  and ```postgres``` with username and password ```postgres```.

### Configuring the application

Please [download][https://nodejs.org/en/download/) from Nodejs on the official Nodejs website and install according to your operating system.

Once installed, run at the root of the project the command:
```sh
npm install
```

After successfully installing the dependencies, we now need to create the entities in the database, so first create the database if you have not done it manually:
```sh
npx sequelize db:create
```
This command will create a new database named <em> cyan-agro </em>. After this step, access the created database and run the following command to install the PostGis extension:

```
CREATE EXTENSION postgis;
```

With that, we need to execute the command to create the entities and relationship in our database:

```
npx  sequelize db:migrate 
```

After running this command, make sure that all entities are properly created. After all the configuration we can execute our api, running in the root of the project:


```
npm start

```

In the file ```files / cyan-agro.postman_collection.json``` there is an example for using our api, feel free to use it.
