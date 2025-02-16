const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();
const { google } = require('googleapis');
const OpenAI = require('openai');


const express = require('express');
const cors = require('cors');
const uri = "mongodb+srv://user:dbpass@bookcluster.knhby.mongodb.net/?retryWrites=true&w=majority&appName=BookCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const app = express();

const port = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.listen(port, async () => {
  try {
    await client.connect();
    console.log(`Server is listening on port ${port}`);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
});

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/addUser', async (req, res) => {
  const { username, password, email, name } = req.body;
  if (!username || !password || !email || !name) {
    return res.status(400).send('All fields are required');
  }

  try {
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
  }
});

app.get('/users', async (req, res) => {
  try {
    const database = client.db('BookCluster');
    const users = database.collection('users');
    const userList = await users.find({}).toArray();
    res.status(200).json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting users');
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

app.post('/getFreeSlots', async (req, res) => {
  const { startDateTime, endDateTime } = req.body; // User-provided range

  try {
    await ensureAccessToken(); // Ensure access token is valid
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDateTime,
      timeMax: endDateTime,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busySlots = events.data.items.map(event => ({
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
    }));

    res.status(200).json({ busySlots });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).send('Error fetching calendar events');
  }
});

