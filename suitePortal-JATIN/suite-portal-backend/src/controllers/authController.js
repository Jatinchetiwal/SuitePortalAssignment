const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcrypt');
const adapter = new FileSync('db.json');
const db = low(adapter);

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = db.get('admins').find({ username }).value();

  if (admin) {
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
