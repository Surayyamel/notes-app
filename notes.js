const fs = require('fs');
const chalk = require('chalk');

// getting the notes
const getNotes = () => {
  return 'Your notes...';
};

// get refreshed notes and add new note to array
const addNote = (title, body) => {
  const notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

// get refreshed notes and remove note from array
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('This note does not exist'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen(title, 'was removed'));
  }
};

// convert new array to JSON and refresh notes.json
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// Getting current notes from notes.json and parsing to array
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Listing all note titles to console
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bold.green('Your notes:'));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

//read a note
const readNote = (title) => {
  const notes = loadNotes();
  const selectedNote = notes.find((note) => title === note.title);
  if (selectedNote) {
    console.log(chalk.bold.inverse(selectedNote.title));
    console.log(selectedNote.body);
  } else {
    console.log(chalk.red('Note note found'));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
