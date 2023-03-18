import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, deleteDoc, setDoc } from 'firebase/firestore/lite';

const PORT = process.env.PORT || 8080 

const firebaseConfig = {
  apiKey: "AIzaSyA4rd-7Ox6xpqOvTofyBKkJC9R82Yridmc",
  authDomain: "phin-security-1.firebaseapp.com",
  projectId: "phin-security-1",
  storageBucket: "phin-security-1.appspot.com",
  messagingSenderId: "756264702777",
  appId: "1:756264702777:web:b972ce78301c7158aa0ee8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

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
  const collectionRef = collection(db, 'todo')
  const collectionSnapshot = await getDocs(collectionRef)
  const todoList = collectionSnapshot.docs.map(doc => { 
    return { id: doc.id, ...doc.data() }
  })

  return res.status(200).send({ items: todoList })
})

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.sendStatus(404)
  }
  let result = {}
  const docRef = doc(db, "todo", id);
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      result = { id: docSnap.id, ...docSnap.data()}
    }
  } catch (error) {
    console.log("ERROR", error)
  }

  return res.status(200).send({ item: result })
})

app.post('/todos/', async (req, res) => {
  const { text, completed } = req.body
  if (!text || !("completed" in req.body)) {
    return res.sendStatus(404)
  }
  const data = { text, completed }
  const newDocRef = doc(collection(db, "todo"))
  await setDoc(newDocRef, data)
  
  return res.status(200).send({ message: 'success' })
})

app.post('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { text, completed } = req.body
  if (!id || !text || !("completed" in req.body)) {
    return res.sendStatus(404)
  }
  const data = { text, completed }
  console.log("DATA", data)
  const docRef = doc(db, "todo", id)
  await setDoc(docRef, data)
  .then(() => {
    console.log("Document has been updated successfully.")
  })
  .catch(error => {
    console.log(error);
  })
  
  return res.status(200).send({ message: 'success' })
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.sendStatus(404)
  }
  const docRef = doc(db, "todo", id)
  deleteDoc(docRef)
  .then(() => {
      console.log("Entire Document has been deleted successfully.")
  })
  .catch(error => {
      console.log(error);
  })

  return res.status(200).send({ message: 'success' })
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))