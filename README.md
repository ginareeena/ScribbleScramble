# ScribbleScramble

## Starting our Servers

- Both front end + back end can be started from **root directory**
  - *without nodemon*: `npm start`
  - *with nodemon*: `npm run dev`

## Build 

- Build can be run from root directory with `cd FrontEnd` and then `npm run build`

## Database

- Database is setup in PostGreSQL with the DB named 'scribble'

## Image Handling

- Images handled as JSON data in components and saved as JSON data in the database
- On save, will download as jpeg via data URL
  - This data url will be temporary and stored locally; once user navigates from 'EndGame' page, will lose access
  - We will have the JSON version saved in the DB for use in our gallery