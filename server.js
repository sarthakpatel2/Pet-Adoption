// require("dotenv").config();
// console.log("MongoDB URI:", process.env.MONGO_URI);
// const express = require('express');
// const mongoose = require('mongoose');
// const petRouter = require('./Routes/PetRoute')
// const AdoptFormRoute = require('./Routes/AdoptFormRoute')
// const AdminRoute = require('./Routes/AdminRoute')
// const cors = require('cors');
// const path = require('path');

// const app = express();

// app.use(cors());

// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(petRouter)
// app.use('/form', AdoptFormRoute)
// app.use('/admin', AdminRoute)

// mongoose.connect(process.env.mongooseURL)
//     .then(() => {
//         console.log('Connected to DB');
//         const PORT = 4000;
//         app.listen(PORT, () => {
//             console.log(`Listening on port ${PORT}`)
//         })
//     })
//     .catch((err) => {
//         console.error(err);
//     })


require("dotenv").config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const cors = require('cors');
const path = require('path');

const app = express();

// Debugging: Check if .env variables are loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(' Connected to MongoDB');

        // Use the PORT from .env, default to 4000 if not set
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(' MongoDB connection error:', err);
    });



