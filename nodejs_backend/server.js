import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const PORT = process.env.PORT || 8080 

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./phin-security-1.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const app = express()
const corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions))
app.use(express.json())
app.get('/', async (req, res) => {
  res.status(200).send({ message: 'online' })
})

app.get('/todos', async (req, res) => {
  const collectionRef = db.collection('todo')
  const snapshot = await collectionRef.get()
  if (snapshot.empty) {
    return res.sendStatus(404)
  }

  let items = []
  snapshot.forEach(document => {
     items.push({id: document.id, ...document.data()})
  })

  return res.status(200).send({ items })
})

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.sendStatus(404)
  }
  const collectionRef = db.collection('todo')
  const docItem = await collectionRef.doc(id).get().then((snap) => {
    let res = {}

    if (!snap.empty) {
      res = { id: snap.id, ...snap.data() }
    }

    return res
  })

  return res.status(200).send({ item: docItem })
})

app.post('/todos/', async (req, res) => {
  const { text, completed } = req.body
  if (!text || !("completed" in req.body)) {
    return res.sendStatus(404)
  }
  const id = uuidv4()
  const data = { text, completed }
  const collectionRef = db.collection('todo').doc(id)
  await collectionRef.set(data, { merge: true })
  
  return res.status(200).send({ message: 'success' })
})

app.post('/todos/:id', async (req, res) => {
  const { text, completed } = req.body
  const { id } = req.params
  if (!id || !text || !("completed" in req.body)) {
    return res.sendStatus(404)
  }
  const data = { text, completed }
  const collectionRef = db.collection('todo').doc(id)
  await collectionRef.set(data, { merge: true })
  
  return res.status(200).send({ message: 'success' })
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  const collectionRef = db.collection('todo').doc(id)
  await collectionRef.delete().then(() => {
    console.log("Document successfully deleted:", id)
  }).catch((error) => {
    console.error("Error removing document:", error)
  })
  return res.status(200).send({ message: 'success' })
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))