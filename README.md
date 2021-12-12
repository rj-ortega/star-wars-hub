## Welcome to Star-Wars-Hub

- App built using technologies:
  - React with Typescript.
  - React-bootstrap and bootstrap for styling.
  - React-router for routing.

### Demo of features and functionality:

![Demo Gif](/src/assets/star-wars-hub-demo.gif)

### Written features and functionality:

- Hitting the `Browse Characters` will hit the api and load the first page which will populate 10 characters
- You can use the pagination to search the second page of the API and load another set of 10 characters.
- Hitting the `Reset` button will clear the people list.
- Searching will return results.
- For any of the characters you can go into the Details page.
- This will take you to another page that will contain more details about that character.
- The Movie posters have been added to the `src/assets` folder since the API doesn't provide images to use.
- Main page will provide a search bar for looking up characters.
- The whole page is responsive depending on the screen size.

### Structure of app

- Two pages
  - Main page that displays characters
  - Details page that provides detailed information

### API used [SWAPI](https://swapi.dev/)

- Created by Paul Hallett Maintained by Juriy Bura ©2021

### Live deploy at [Star-Wars-Hub](https://star-wars-hub.surge.sh/)

### To run:

- To install do `yarn install` or `npm install`
- To run locally do `yarn start` or `npm start`
  - Runs the app in the development mode.\
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
