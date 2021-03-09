# Overlook (aka Pounce)

This project is a a hotel management tool for hotel customers and staff to manage room bookings and calculate customer bills. 
I started the project from scratch and steadily built up the html and css for a customer, then login functionality, then added 
a manager's view. The primary class I'm using is a BookingsEngine that creates booking objects by merging the info brought in 
with the booking API and the info from the room API. The purpose of merging these two sets of information was to have everything 
available in one object (for later checking things like whether a room is booked or not). 

## Tech Stack
* Languages
  * Vanilla JS
  * HTML
CSS & SASS (BEM styling for classes)
* Web browser engine & compiler
  * Webpack
*Testing suite
  * Mocha
  * Chai

## Design Inspiration and wins
My primary design inspiration was [this layout on Dribble](https://dribbble.com/shots/2829139-Atlas-hotel-dashboard/attachments/581022?mode=media). 
I also created a gauge with html/css using [this tutorial](https://www.youtube.com/watch?v=FnUkVcQ_3CQ) and also [this codepen](https://codepen.io/andygongea/pen/LyVwEP). 
I used [this tutorial](https://www.youtube.com/watch?v=6ophW7Ask_0) to start building my modals with html/css.

## Outcome

The app is 100% responsive and obtains 100% scores on Lighthouse, and can be navigated with tab/enter keys. Layouts did come out 
pretty much the way I wanted them to, without much design sacrificed in the name of code functionality.

## Challenges

I still struggle a bit with understanding scope of promises and async timing, and could definitely benefit from refactoring to better use those features.

## Future iterations

 * Future iterations would include a class for bookings that builds the bookings by merging booking info and room info, and then the engine would 
create a "repository" with that booking info. 
 * Make logging in more adaptable and dynamic (perhaps using local storage). 
 * Refactor the html to only change viewability of certain pieces depending on who is logged in. There is a 
lot of opportunity for refactoring in the html.

## Fork or Clone This Repo

Feel free to fork or clone, and then follow below instructions for running this application locally. Since the API endpoints aren't 
deployed, you'll need to also clone the backend repo, here:  [Backend](https://github.com/turingschool-examples/overlook-api)

## Setup

Install dependencies at the root of the project:

```bash
npm install
```

```bash
npm start
```

You should see something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Running Tests

To run the test suite:

```bash
npm test
```

---

## Linting 

To run the linter:
```bash
npm run lint
```


### About me
Last but not least, a little about me. I am Nikki and I am a Front End Software Engineer. I love making things that are
engaging and interesting, with simple design and easy flow.


Created by { Nikki }, with 🏳️‍🌈, 🧠,  🍩, ☕, and ❤️.
