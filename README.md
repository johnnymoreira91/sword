# TS - Sword

## This is it

This project has
  - User {
    create, edit, list, delete
  }

  - Task {
    create, edit, list, delete, complete
  }

There are two types of user roles 
  - Manager
  - Technician

## How to start?

  i'm using yarn, but you can use npm run

  - yarn install / npm install
  - docker-compose up -d

  ### Developer version
  - yarn dev / npm run dev - to execute dev enviroment
  - env port = 3001

  ### Production version
  - yarn build - to create on ./dist the compiled version
  - yarn prod - to execute pm2 with production 
  - yarn stop - to stop pm2 and all instance of pm2
  - env port = 8080

