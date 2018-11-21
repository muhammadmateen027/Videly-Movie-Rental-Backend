# Videly 
## A NodeJs Example
This project is only for beginner to understand Express, MongoDB and Fawn.
Here you can get help in creating and designing MongoDB database using NodeJs. 

## Mongo DB
**MongoDB on Mac**: To install mongodb on Mac follow this link: [Install on Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html).

**MongoDB on Windows**: To install MongoDB on Windows follow this link: [Install on Windows](https://treehouse.github.io/installation-guides/windows/mongo-windows.html).

**How id is created in MongoDb? What is the pattern of mongodb auto generated id?**
Id: 5bf275de87fed19a7c3f1cbf
Id contains 24 characters, which means 12 bytes. It's created as follows by MongoDB driver:

- 4 bytes: timestamp 
- 3 bytes: machine identifier
- 2 bytes: process identifier
- 3 bytes: counter
**Note**:(you can also set ascending or descending order w.r.t id).

```
You can get Id and timestamp from Id in console before adding in database as follows: 

const mongoose = require('mongoose');

const id = new moongoose.Types.ObjectId();
console.log(id);

const timeStamp = id.getTimeStamp(); 
console.log(timeStamp);
```
To validate and handle error while vaalidating the Id's, you may use a package with joi as: 

```
npm i joi-objectid
```

## What is Fawn? 
Fawn is library to store data in different tables with one request. It's based on the same techniques known as **Transaction** in MySql Database. In mongodb it's known as **Two-Phase commit**. 
For example: 
I'm going to insert a value A in table Movies and same time I wanna update a table Customers with Value B. If 1st table value is inserted and that time 2nd table were not updated with any means, then the value inserted in table one will be reverted. **Fawn is actually a promise to store data**. 
For more detail follow this link: [Fawn](https://github.com/e-oj/Fawn).

## *Helping Node JS Commands*
- npm init --yes
- npm i (install any package like: npm i mongoose)
- npm un (un-install any package like: npm un mongoose)
 

## *Helping git commands*

```
git init 
git add README.md 
git commit -m "first commit" 
git remote add origin https://github.com/mateenumt027/videly.git 
git push -u origin master 
```