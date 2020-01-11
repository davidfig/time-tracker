# time-tracker
A self-hosted Time Tracker using node.js, sqlite3, and HTML5. Similar in feel to FreshBooks's time tracker functionality (but without the cost).

This is currently a work in progress, and is not ready for beta use. I'll change this once I start dogfooding my own time tracking.

## Features
* Self-hosted node.js application using sqlite3 for database
* Run it locally or on a server
* Each user has its own clients and client-related projects
* Track time and toggle the timer between different clients and/or projects
* Built-in timer, or manually enter duration or start/end time

## WIP Features
* Invoice generation
* Export time to csv

## Possible Future Features
* Track expenses
* Track paid invoices
* Team-based clients/projects/users

## Installation
1. `git clone git@github.com:davidfig/time-tracker.git`
2. `yarn` or `npm install`
3. if running on localhost, no edits are needed, just run `yarn start` and open your browser to [localhost:4560](http://localhost:4560). 
4. If running on a domain:
   a. edit `settings.json` and update name, and port (if needed)
   b. reverse proxy node app using nginx or web server of choice (todo: add instructions/link)
3. `yarn start` or `pm2 add <time-tracker-directory>/index.js`

## License  
MIT License  
(c) 2020 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)