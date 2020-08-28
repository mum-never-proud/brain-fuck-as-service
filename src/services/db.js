import FileASync from 'lowdb/adapters/FileAsync';
import lowdb from 'lowdb';
import shortid from 'shortid';

const adapter = new FileASync('/tmp/db.json');
const db = lowdb(adapter);

db.then((fptr) => fptr.defaults({ instructions: [] }).write());

export function isDuplicateEntry (tokens) {
  return db.then((fptr) => fptr.get('instructions')
    .value()
    .filter(instruction => instruction.tokens.toString() === tokens.toString())[0]
  );
}

export function write (instructions) {
  const record = { ...instructions, id: shortid.generate() };

  return db.then((fptr) => fptr.get('instructions')
      .push(record)
      .write()
    )
    .then(() => record);
}

export function read (id) {
  return db.then((fptr) => fptr.get('instructions').find({ id }).value());
}
