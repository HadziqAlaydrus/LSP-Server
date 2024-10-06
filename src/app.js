const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api', orderRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/cart', orderRoutes);
app.use('/api/cart/:id', orderRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
