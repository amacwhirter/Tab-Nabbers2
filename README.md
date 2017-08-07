# Tab Nabbers

- [App](https://bootcruitv2.herokuapp.com/) - Currently being built for the community by the community
- Goal -  to help make job hunt easier
- Instead of looking for a job, for the job to look for you
- Get involved into the community

> The best way to get involved into the community, is to be a part of it


## Benefits contributing

- Being to be a part of something great
- Joining a network of full stack developers with different skill set
- Newbies are assigned a mentor to help them contribute to the project.
- Meeting other developers and extend your network
- Giving back to the community




## Folders Structured

```
|-- front/
   |-- components/
         └── common
                └── Footer.js
                └── Navbar.js
         └── About.js
         └── D3Map.js
         └── Event.js
         └── Home.js
         └── Main.js
         └── Profile.js
         └── Recruiter.js
         └── Student.js
   |-- containers/
        └── Home.js
   |-- reducers/
        └── index.js
        └── small.js
   |-- routes/
        └── Page.js
        └── routes.js
   |-- test/
   |-- utils
        └── api.js
   |-- index.js
|-- back/
   |-- config/
        └── config.json
        └── secret.js
   |-- controllers/
        └── recruitercredentials.js
        └── securerecruiter.js
        └── securestudents.js
        └── studentcredentials.js
   |-- models/
        └── bootcamp.js
        └── cohort.js
        └── index.js
        └── recruiter.js
        └── user.js
   |-- test/
        └── test.js
|-- .babelrc
|-- .gitignore
|-- package.json
|-- Procfile
|-- Readme.md
|-- server.js
|-- webpack.config.js

```


## Getting Started

To get started on this project, follow the instructions below.

### Installations

Before you contribute

Make sure you install all the dependencies you need for the project
Once you have [Node.js](https://nodejs.org/en/) installed on your computer
Navigate to the working directory and do the following in your terminal

Before you proceed, make sure you fork the repo

> Note: If the below process doesn't work for you, no worries. Create an issue

##### Step 1
> npm install
```
The above command will install all the dependencies you need!
```



##### Step 2
> Navigate in the '/back/config/' and create a file named 'config.json'
> Put the below code within it. 

> Your password and database named need to be replaced with your database info
```
{

  "development": {
    "username": "root",
    "password": "password",
    "database": "sequelize_passport",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": null,
    "database": "",
    "host": "",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "use_env_variable": "JAWSDB_URL"
  }

}

```


##### Step 3
> npm install
```
Open your terminal in the working directory, and run the above command in your
 
terminal

```

##### Step 4
> node server.js

By running the above command, the app will be starting, and you can view it by

clicking on this link [localhost](http://localhost:8080) or type http://localhost:8080 in your browser



##### Step 5 

You should see this screen below on your browser. If not, you ran into some errors

<img 
    src='http://i.imgur.com/Vi24jtC.png' width='600' alt='App home page'>

Happy Contributing!



### Technologies

 - Node.JS
 - Express
 - MySQL
 - React.JS
 - Redux
 - Axios
 - JavaScript
 - Sequelize
 - Semantic UI
 - Nightmare
 - D3.js
 - Mocha
 - Chai
 - Cloudinary
 - Passport


## Contributing


There are different ways to contribute
  - Front End (React.js, Redux, JavaScript, Axios, D3, Sass)
  - Back End (Node.js, express, building API, etc )
  - Designers
  - Genius Idea's
  - Unit Testers
  - Product Managers
  - etc.


### Happy coding!