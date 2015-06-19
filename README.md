# Unfollowers

[![dependency status][dep-badge]][dep-status]

[dep-status]: https://david-dm.org/Sirikon/Unfollowers
[dep-badge]: https://david-dm.org/Sirikon/Unfollowers.svg?style=flat-square

Check who unfollowed you in a fast and simple way

No Ads, no unexpected twits, no problem!

## Why this project ##
Every unfollowers app that I found online had the required permission to send twits, send you ads or any other shit. So I made one for myself :B

## Requirements ##
 * Node.js
 * Twitter App credentials
 * MongoDB database

## Run ##
First, set the environment variables for Twitter credentials
````bash
export TWITTER_CONSUMER_KEY="xxxxxxxxxxxxxxxxxxxxxxxx"
export TWITTER_CONSUMER_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
````
Twitter credentials are the ones required to be defined as environment variables, you can find more configurable variables in services/Config.js

Run the MondoDB database
 
Then download the dependencies and run:
````bash
npm install
node app.js
````

## Contribute ##
If anyone want to contribute, please, fork this project, do your contributions and send me a pull request, I'll review them and publish if everything is okay :)
