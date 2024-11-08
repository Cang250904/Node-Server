const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import routes
const tourRoutes = require('./routes/tourRoutes'); // Ví dụ về route cho "tour"
app.use('/api/tours', tourRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
