const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');



notes.get('/', (req,res) => {
    console.info(`${req.method} request received for feedback`);
    
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit feedback`);
  
    // Destructuring assignment for the items in req.body
    const { title,text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newText = {
        title,
        text,
      };
  
      readAndAppend(newText, '../db/db.json');
      require('../db/db.json')
  
      const response = {
        status: 'success',
        body: newText,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting text');
    }
  });
  
  module.exports = notes;