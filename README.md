# Runman Game
## What is the game?
A side-scrolling fullstack pixel game where player has to make the character avoid obstacles and kill the monsters. The game uses <b>Flask</b> as its backend, <b>PostgreSQL</b> as database, and <b>CSS</b>, <b>HTML</b> and <b>JS</b> as its frontend.
## What the Repository contains
The repository contains the following files and folders:
### Backend
 - `app/main.py`: where all the routes, models, imports and database configurations are in.
 - `wsgi.py`: what the deployment host look for to run the backend.
 - `requirements.txt`: all the dependencies to run the api mentioned here.
 - `runtime.txt`: the version of Python to use as runtime mentioned here.
### Frontend
- `index.html`: the main `Html` file for the game.
- `indexAr.html`: the Arabic version of `index.html`.
- `script.js`: the JavaScript file.
- `style.css`: the CSS file.
- `sound`: a folder that has all the sounds used in the game.
- `img`: a folder that has all the images used in the game.
- `ArabicPixel1.ttf` and `ArabicPixel2.ttf`: the fonts used in the game.
- `Runman.zip`: the game in .zip file to download via the `download` button inside `Settings`.

You can play the game online via [br19.herokuapp.com/runman](https://br19.herokuapp.com/runman) 
