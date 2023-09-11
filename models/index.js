const yargs = require('yargs');
const contacts = require('./contacts');

const {hideBin} = require('yargs/helpers');


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      return allContacts;

    case 'get':
        
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      return oneContact;
      

    case 'add':
      const newContact = await contacts.addContact({name, email, phone});
      console.table(newContact);
      return newContact;


    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact)
      return removeContact;
      default:
      console.warn('\x1B[31m Unknown action type!');

  }
}

const arr = hideBin(process.argv);
const {argv} = yargs(arr);
invokeAction(argv);