const app = require('./server');
const DBConnection = require('./database/DB');

DBConnection();

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
