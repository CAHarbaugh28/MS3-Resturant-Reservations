### Carter's Gourmet Burgers

## Deployment For Heroku
EVERY COMMIT WILL CREATE A NEW DEPLOY IN HEROKU!!!!!

The main file is the ./Procfile that Heroku will exeute when we GIT commit and push changes.

There are 2 main applications
./client is the React App
./server is the Node Express App

Before you make a commit, each time you must build and output the React App into the ./server/Public folder. This path is configured to serve up static files such as html, js, css, images, etc...

So...to make this happen there is a bit of hackery.

Change to the directory ./client and run the following
-npm run heroku-build

This command will do a few things
npm install
set the BUILD_PATH for the react app to output its build files into the ./server/public folder
..and runt the react build command.  I have the package.json configured for 'heroku-build' to do all the commands at once. :)

The next time you commit you will have all the latest files for your website deployed in heroku.
cartersburgers.com should show the main 'index.html' file by default.

As a bonus you can view the heroku build/deploy logs using the cli
-heroku login (this will take you to the website to login the sesson)
-heroku logs --tall -a ms-fullstack-project

## Debug React App with Express API Locally