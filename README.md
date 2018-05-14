## PREVIEW ##
https://harprasad.github.io/UDFullStack2/

## SETUP ##
To clone this repository use the following command 
```
$ git clone https://github.com/harprasad/UDFullStack2.git
```
## INSTALL NODE ##
It's possible to open the index.html file directly in browser but I would recommend to use a web server. To do so you can use nodejs or any other third party tools.
Install nodejs from ***https://nodejs.org/en/***

## RUN ##
open command prompt or terminal then "cd" to the project directory and run the following command 
```
$ http-server
```
Visit 127.0.0.1:8080 or localhost:8080 using your browser.


## FEATURES ##
This application has the follwoing features.
* Display a list of interesting places near Pyrmont Australia
* A searchbox to filter locations
* Photo and Address details of a location


## APIS USED ##

* Google Maps
* Foursquare

## CODE STRUCTURE ##
There are two main files that contain most of the code **js/api.js** and **js/app.js** .
app.js contains all the code for view model and Location constructor. api.js file contains all the api related funcions such as map initialisation & foursquare api calls.

