const app = require('express')();
const app1 = require('express');

app.use(app1.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);