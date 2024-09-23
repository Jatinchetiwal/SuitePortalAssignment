const app = require('./app'); // Import the app instance
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
