const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

exports.createRequest = (req, res) => {
  const { name, email, unitNumber, serviceType, summary, details } = req.body;
  const newRequest = { id: Date.now().toString(), name, email, unitNumber, serviceType, summary, details, status: 'open' };
  db.get('maintenanceRequests').push(newRequest).write();
  res.status(201).json(newRequest);
};

exports.getRequests = (req, res) => {
 const requests = db.get('maintenanceRequests').value();
  res.json(requests);
};

exports.closeRequest = (req, res) => {
  const { id } = req.params;
  const request = db.get('maintenanceRequests').find({ id }).assign({ status: 'closed' }).write();
  res.json(request);
};
