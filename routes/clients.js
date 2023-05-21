const express = require('express')
const router = express.Router()
const Client = require('../models/Client')

// Getting all
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
    res.json(clients)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getClient, (req, res) => {
  res.json(res.client)
})


// Getting by sharedKey
router.get('/findbysharedKey/:sharedKey', async (request, response) =>{
  try {
      let requestEmail = request.params.email;
      let findClient = await Client.findOne({email: requestEmail});
      response.status(202).json(findClient);
  }catch(error){
      response.status(400).json({ErrorMessage: `Error: ${error}`});
  }
});


// Creating one
router.post('/', async (req, res) => {
  const client = new Client({
    sharedKey: req.body.sharedKey,
    businessID: req.body.businessID,
    email: req.body.email,
    phone: req.body.phone,
    dataAdded: req.body.dataAdded,
    endDate: req.body.endDate,
  })
  try {
    const newClient = await client.save()
    res.status(201).json(newClient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Updating One
router.patch('/:id', getClient, async (req, res) => {
  if (req.body.sharedKey != null) {
    res.client.sharedKey = req.body.sharedKey
  }
  if (req.body.businessID != null) {
    res.client.businessID = req.body.businessID
  }
  if (req.body.email != null) {
    res.client.email = req.body.email
  }
  if (req.body.phone != null) {
    res.client.phone = req.body.phone
  }
  if (req.body.dataAdded != null) {
    res.client.dataAdded = req.body.dataAdded
  }

  if (req.body.endDate != null) {
    res.client.endDate = req.body.endDate
  }
 
  try {
    const updatedClient = await res.client.save()
    res.json(updatedClient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getClient, async (req, res) => {
  try {
    await res.client.deleteOne()
    res.json({ message: 'Deleted Client' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getClient(req, res, next) {
  let client
  try {
    client = await Client.findById(req.params.id)
    if (client == null) {
      return res.status(404).json({ message: 'Cannot find client' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.client = client
  next()
}

module.exports = router