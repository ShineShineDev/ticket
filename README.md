## Bus Ticket System 



### System Overview

> The Ticket Management System enables staff to Create, Read, Update, and Delete tickets. Supervisors and leaders have extended capabilities, including the creation of Way, Bus, and Passengers in addition to reviewing staff-created tickets.



### Key Features

1. **User Roles**

   - Staff: CRUD operations on tickets.
   - Supervisor/Leader: View and Review staff tickets, Create Way, Bus, and Passengers.

2. **Ticket Lifecycle Management**

   - Create, Read, Update, Delete tickets.

3. **Fleet Management**

   - Supervisors and leaders can create Ways, adding buses and managing passenger details.

4. **User-Friendly Interface:**

   - Intuitive design for easy navigation.

5. **Security and Access Control**

   - Secure authentication and access controls.

     

### Show Case Photos Link

https://drive.google.com/drive/folders/1TcLjQT3HIc49yTPCS0rNVMoKeN_mffnO?usp=sharing



### Usage

- `Front-End`
  - `Vue + coreUI`
- `Back-End`
  - `Nodejs + Express +  Typescript + TypeORM`
- `Database`
  - `MongoDB on Atlas`
- `Infra`
  - `AWS EC2 Instance For BackEnd` (http://ec2-3-27-191-151.ap-southeast-2.compute.amazonaws.com/)



### Download PostMan Collection Link

https://drive.google.com/file/d/1hwAaYyd71HaLtSRO-_R3wdZ5GTuSnNYd/view?usp=sharing



### Prerequisite

- **`Node Version v20`**

  ```js
  $ node -v
  ```



### Clone Repo

```cmd
git clone https://github.com/ShineShineDev/ticket.git
```



### Run Front End App

```js
$ cd ticket/
$ cd front-end/

$ npm i    
$ npm run serve
```

Browse on => http://localhost:8080/ 

> ##### Config For Back-End Connections
>
> ```js
> //front-end/src/config.js
> 
> // export const BASE_URL = 'http://localhost:3000';
> export const BASE_URL = 'http://ec2-3-27-191-151.ap-southeast-2.compute.amazonaws.com';
> ```



### Run Back End App

```js
$ cd back-end/
$ npm i    
$ npm run dev
```

Browse on => http://localhost:3000

> #### Config For Database Connections
>
> ```js
> //back-end/ormconfig.json
> 
> {
> "type": "mongodb",
> "url": "mongodb+srv://ticket:cLAMFYAbDyYw5zzU@cluster0.xawwpks.mongodb.net/ticket?retryWrites=true&w=majority",
> "useNewUrlParser": true,
> "synchronize": true,
> "logging": true,
> "entities": ["src/models/**/*.ts"],
> "migrations": ["src/migrations/**/*.ts"],
> "subscribers": ["src/subscribers/**/*.ts"],
> "cli": {
> "entitiesDir": "src/models",
> "migrationsDir": "src/migrations",
> "subscribersDir": "src/subscribers"
> }
> }
> ```
>
> 



:warning: Please let me know if you have any questions or errors

 -	 09 7877 966 98
 -	 aungshine194@gmail.com
