const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(id) {
  const contactId = String(id);
  const contacts = await listContacts();
  const currentContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId,
  );

  if (currentContactIndex === -1) {
    return null;
  }

  const removedContact = contacts.splice(currentContactIndex, 1)[0];

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
async function updateContact(contactId, data) {
  const contactIdStr = String(contactId);
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactIdStr,
  );

  if (contactIndex === -1) {
    return null; // Контакт з таким ідентифікатором не знайдено
  }

  const updatedContact = { ...contacts[contactIndex], ...data };
  contacts[contactIndex] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
