const express = require('express');
require('dotenv').config()
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')
const { connection } = require('./DataBase/db.js');

//Documentation
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { options } = require('./Util/swaggerOptions.js');

const swaggerSpec = swaggerJsdoc(options)

const handleErrors = require('./Middlewares/handleErrors.js')
const handleNotFound = require('./Middlewares/handleNotFound.js')

const userRouter = require('./Routes/userRoutes.js')
const amazonRouter = require('./Routes/amazonRoutes.js')
const disneyRouter = require('./Routes/disneyRoutes.js')
const netflixRouter = require('./Routes/netflixRoutes.js')
const direcTvRouter = require('./Routes/direcTvRoutes.js')
const hboRouter = require('./Routes/hboRoutes.js')
const crunchyrollRouter = require('./Routes/crunchyrollRoutes.js')
const paramountRouter = require('./Routes/paramountRoutes.js')
const plexRouter = require('./Routes/plexRoutes.js')
const spotifyRouter = require('./Routes/spotifyRoutes.js')
const startPlusRouter = require('./Routes/startPlusRoutes.js')
const youtubeRouter = require('./Routes/youtubeRoutes.js')

const salesRouter = require('./Routes/salesRoutes.js')

//express server configuration
const app = express();
const PORT = process.env.PORT || 3050
const corsOptions = {
  origin: ['http://localhost:3000'], // Lista de IPs permitidas
  optionsSuccessStatus: 200 // Algunos navegadores requieren explícitamente esto para los códigos de estado 204
};

app.use(cors(corsOptions))
app.use(morgan('dev')) // This is to see in the console the requests that are being made to the server
app.use(express.json()) // to convert the incoming data to json format
app.use(express.urlencoded({ extended: false })) // so it can read json documents coming from html forms
app.use(express.static(path.join(__dirname, 'Public')));

// Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Index.html'));
});

// Route-Handler to visit our docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCssUrl:
  "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css" }));
// Make our docs in JSON format available
app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use('/api', userRouter)
app.use('/api', amazonRouter)
app.use('/api', disneyRouter)
app.use('/api', netflixRouter)
app.use('/api', paramountRouter)
app.use('/api', youtubeRouter)
app.use('/api', hboRouter)
app.use('/api', plexRouter)
app.use('/api', crunchyrollRouter)
app.use('/api', spotifyRouter)
app.use('/api', startPlusRouter)
app.use('/api', direcTvRouter)
app.use('/api', salesRouter)

// error handling
app.use(handleErrors)
app.use(handleNotFound)

  // Check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running! 😁');
});


app.listen(PORT, () => console.log('Server on port', PORT, '✔✔'));