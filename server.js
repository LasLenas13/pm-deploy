const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use(express.static(`${__dirname}/public`))


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '98980c8b6c164a55976aaead32a4b7b2',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/error', (req, res) => {
  try {
    nonExistentFunction();
  } catch (error) {
    rollbar.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Rollbar critical error
app.get('/critical', (req, res) => {
  try {
    nonExistentFunction();
  } catch (error) {
    rollbar.critical(error);
    res.status(500).send('A critical error occurred.');
  }
});

// Rollbar warning
app.get('/warning', (req, res) => {
  const warningMessage = 'This is a custom warning message.';
  rollbar.warning(warningMessage);
  res.status(200).send('A warning has been logged.');
});

const navyShips = [
  'USS Nimitz',
  'USS Gerald R. Ford',
  'USS Abraham Lincoln',
  'USS Enterprise',
  'USS George H.W. Bush',
];

app.get('/api/ships', (req, res) => {
  rollbar.info('success!')
  res.json(navyShips);
});

app.post('/api/ships', (req, res) => {
  const shipName = req.body.shipName;
  if (shipName) {
    navyShips.push(shipName);
    rollbar.info(`${shipName} was added`)
    res.status(201).json({ message: 'Ship added successfully' });
  } else {
    res.status(400).json({ message: 'Ship name is required' });
  }
});

app.listen(4000, () => {
    console.log('app is up on 4000')
})