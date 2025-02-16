const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:dbpass@bookcluster.knhby.mongodb.net/?retryWrites=true&w=majority&appName=BookCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', async(req, res) => {
    res.send('Hello World!');
})

app.post('/addUser', async (req, res) => {
  const { username, password, email, name } = req.body;
  if (!username || !password || !email || !name) {
    return res.status(400).send('All fields are required');
  }

  try {
    await client.connect();
    const database = client.db('BookCluster');
    const users = database.collection('users');
    if (await users.findOne({ username })) {
      return res.status(400).send('Username already exists');
    }
    const newUser = { username, password, email, name };
    const result = await users.insertOne(newUser);
    res.status(201).send(`User added with ID: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user');
  } finally {
    await client.close();
  }
});


app.get('/users', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('BookCluster');
    const users = database.collection('users');
    const userList = await users.find({}).toArray();
    res.status(200).json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting users');
  } finally {
    await client.close();
  }
});

app.post('/userLibrary', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send('Username is required');
  }
  try {
    const database = client.db('BookCluster');
    const users = database.collection('users');
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const libraryObjectID = user.library;
    const library = await database.collection('library').findOne({ _id: new ObjectId(libraryObjectID) });
    if (!library) {
      return res.status(404).send('Library not found');
    }
    return res.status(200).json(library);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting user library');
  }
});

