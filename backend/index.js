require('dotenv').config();
const app = require('./src/app');

// Start the server
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = app;