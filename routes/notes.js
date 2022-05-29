const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



notes.get('/', (req,res) => {
    console.info(`${req.method} request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received`);


    // Destructuring assignment for the items in req.body
    const { title,text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newText = {
        title,
        text,
        text_id: uuid(),
      };
  
      readAndAppend(newText, './db/db.json');
  
  
      const response = {
        status: 'success',
        body: newText,
      
      };
  
      res.json(response);
    } else {
      res.json('Error in posting text');
    }
  });

  notes.delete('/:text_id', (req, res) => {
    const textId = req.params.text_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((notes) => notes.text_id !== textId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${textId} has been deleted 🗑️`);
      });
  });
  
  
  module.exports = notes;