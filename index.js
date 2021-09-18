require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello everyone now we are o the port 8080.");
});
app.listen(process.env.PORT, () => {
    console.log(`The server is running on the port ${process.env.PORT}`);
})