const express = require('express');
const app = express();
var port = process.env.PORT || 3000
app.get('/', (req, res) => res.send("Hello World, Xie, current port " + port + "this is in b.js"));
app.listen(port, () => console.log('Server is running on port ', port));
console.log('finally arrive here, let us continue...');
