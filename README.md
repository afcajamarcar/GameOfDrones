# Programming Assessment UruIT
This is my solution to the Programming Assessment by UruIT

## Tech Stack ##
### Backend ###
* NodeJS - latest
* Express - 4.17.1
* Docker
* MongoDB
* Mongoose - 5.10.5
### Frontend ###
* React - 16.13.1
* [create-react-app](https://github.com/facebook/create-react-app)
* HTML
* CSS (Sass with [node-sass](https://www.npmjs.com/package/node-sass) - 4.14.1)

_Both Backend and Frontend are included in this repo_.
## Execution ##
_To ease the execution of this test I included in the repo's root a script **start_backend.sh** which builds and ups a docker container for the backend side of the app_.
#### Steps to follow ####
1. Run the script **start_backend.sh** until the container is up and listening on port _5000_.
    1. You could init the backend by browsing to the folder **backend** and running  **npm i** y **npm start** respectively.
    2. If you follow the non-docker path, you must ensure that you have MongoDB in your system.
2. Browse to the folder **frontend** and run the commands **yarn install** y **yarn start** respectively.
    1. Frontend serves over port _3000_.
    2. Yarn doesn't come _out of the box_ in some Nodejs distributions, thus it's recommended to check if **yarn -v** outputs something.
    3. There's a [known issue](https://github.com/facebook/create-react-app/issues/6594) with _react-scripts_ package in MacOS. I recommend,  if you're using MacOS, to run the next command en in **frontend** folder of this repo: _yarn add react-scripts_ (It's important to run **yarn start** before hand).

## Preview ##
![frontend-afcajamarcar-preview](https://i.ibb.co/fqd6sYM/Screenshot-20200919-114335.png)
