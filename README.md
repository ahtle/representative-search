# "Represented" Overview
Search your state representative by running your address through the Google Civic API. Returns your senators and congressperson along with their phone number, twitter, and facebook. User can also device's current location feature instead of typing out address manually.

## Background

With the current election, people are becoming more interested in politic more than ever. Unfortunately, 3 of 4 American don't know who their state's representatives are; I myself am in this population. Whether you are Democrat or Republican, you should be empowered to find out who represents you in Congress. I hope that this app will makes it easy to not only identify your representatives, but also to contact them via phone, Facebook, or Twitter.

## Functionality 
<ul>
    <li>Take user address inputs in form of street address, city, or ZIP code</li>
    <li>User can opt to use their device's location by simply clicking a button instead of entering their address</li>
    <li>Return a formatted version of user's input so that user can double check the desired location</li>
    <li>Return user's senators and congressperson along with their phone number, Facebook, and Twitter links</li>
    <li>Return representatives' political party with color code for ease of recognition</li>
</ul>

## Working version and screenshot

Use this link to try the app for yourself! https://anhhtle.github.io/Representative-Search/

![alt tag](https://github.com/anhhtle/Representative-Search/blob/master/images/screenshot.png)

## Technology

"Represented" is a Javascript/JQuery based web app. User's address input is processed with Google Civic API to return results. The "device location" function is achieved by using HTML's native geolocation tool to get the device's longitude and latitude. The coordinates are then translated to formal address with the help of Google MAP Geolocation API.

## Future Enhancement
<ul>
    <li>Add map outlining congressional district</li>
    <li>Include more local representatives: Governor, District Attorney, Sherif, etc...</li>
</ul>
