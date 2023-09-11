const express = require('express')
const contacts = require('../../models/contacts.js');
const HttpError = require('../../helpers/HttpError.js');



const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await contacts.listContacts();
  res.json(result)
  } catch (error) {
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    
    if(!result){
      throw HttpError(404, 'Not Found');
    }
    res.json(result)
  } catch (error) {
    next(error)
    
  }
  
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
   
  } catch (error) {
    next(error)
  }
  
})

// router.delete('/:contactId', async (req, res) => {
//   try {
//     const result = await contacts.removeContact(id);
//     res.json(result)
    
//   } catch (error) {
//     next(error)
//   }
 
// })

router.put('/:contactId', async (req, res) => {
  res.json({ message: 'template message' })
})

module.exports = router
