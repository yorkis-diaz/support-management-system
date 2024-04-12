const app = require('./app');

// Start the server
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});