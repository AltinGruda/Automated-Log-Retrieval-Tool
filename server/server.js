const express = require('express');
const app = express();
const cors = require('cors');
const deviceRoutes = require('./routes/deviceRoutes');

require("dotenv").config({ path: "./config/.env" });


// app.use(
//     cors({
//       origin: 'http://localhost:5173',
//       methods: 'GET,POST,PUT,DELETE',
//       credentials: true,
//     })
//   );

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', deviceRoutes);

app.listen(process.env.PORT, () => [
    console.log(`Server is running at ${process.env.PORT}`)
])