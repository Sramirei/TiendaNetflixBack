const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { connection } = require("./DataBase/db.js");

//Documentation
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { options } = require("./Util/swaggerOptions.js");

const swaggerSpec = swaggerJsdoc(options);

const handleErrors = require("./Middlewares/handleErrors.js");
const handleNotFound = require("./Middlewares/handleNotFound.js");

const userRouter = require("./Routes/userRoutes.js");
const amazonRouter = require("./Routes/amazonRoutes.js");
const disneyRouter = require("./Routes/disneyRoutes.js");
const netflixRouter = require("./Routes/netflixRoutes.js");
const direcTvRouter = require("./Routes/direcTvRoutes.js");
const hboRouter = require("./Routes/hboRoutes.js");
const crunchyrollRouter = require("./Routes/crunchyrollRoutes.js");
const paramountRouter = require("./Routes/paramountRoutes.js");
const plexRouter = require("./Routes/plexRoutes.js");
const spotifyRouter = require("./Routes/spotifyRoutes.js");
const startPlusRouter = require("./Routes/startPlusRoutes.js");
const youtubeRouter = require("./Routes/youtubeRoutes.js");
const salesRouter = require("./Routes/salesRoutes.js");

//express server configuration
const app = express();
const PORT = process.env.PORT || 3050;
const corsOptions = {
  origin: ["http://localhost:3000"], // Lista de IPs permitidas
  optionsSuccessStatus: 200, // Algunos navegadores requieren explícitamente esto para los códigos de estado 204
};

var dataUser;
function handleHeader(req, res, next) {
  // Acceder a los encabezados de la solicitud
  const headers = req.headers;

  // Extraer datos de usuario, IP y email de los encabezados
  const meta = {
    user: headers["user"] || "desconocido",
    ip: headers["ip"] || "desconocido",
    emailUser: headers["emailuser"] || "no disponible",
    origin: headers["origin"] || "no disponible",
  };

  dataUser = meta;

  next();
}

// Agregar el token personalizado a morgan con formato personalizado
morgan.token("custom", function (req, res) {
  const status = req.statusCode >= 400 ? "\x1b[31m" : "\x1b[32m"; // Green for success, red for error
  const resetColor = "\x1b[0m"; // Reset color
  const method = req.method;
  const url = req.originalUrl || req.url;

  return `${status}[${method}]${resetColor} ${res.statusCode} ${url} - Usuario: ${dataUser.user}, Email: ${dataUser.emailUser} - Ip: ${dataUser.ip} - Origen: ${dataUser.origin} - Fecha: ${new Date()} - ${res.get("X-Response-Time")} ms`;
});

app.use(cors(corsOptions));
app.use(morgan(":custom")); // This is to see in the console the requests that are being made to the server
app.use(handleHeader);
app.use(express.json()); // to convert the incoming data to json format
app.use(express.urlencoded({ extended: false })); // so it can read json documents coming from html forms
app.use(express.static(path.join(__dirname, "Public")));

// Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Public/Index.html"));
});

// Route-Handler to visit our docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);
// Make our docs in JSON format available
app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api", userRouter);
app.use("/api", amazonRouter);
app.use("/api", disneyRouter);
app.use("/api", netflixRouter);
app.use("/api", paramountRouter);
app.use("/api", youtubeRouter);
app.use("/api", hboRouter);
app.use("/api", plexRouter);
app.use("/api", crunchyrollRouter);
app.use("/api", spotifyRouter);
app.use("/api", startPlusRouter);
app.use("/api", direcTvRouter);
app.use("/api", salesRouter);

// error handling
app.use(handleErrors);
app.use(handleNotFound);

// Check connect
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running! 😁");
});

app.listen(PORT, () => console.log("Server on port", PORT, "✔✔"));
