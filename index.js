const express = require("express");
const app = express();
const Server = require("http").createServer(app);
const dotEnv = require("dotenv");
dotEnv.config({ path: "/config/config.env" });
const databaseConfiguration = require("./config/dbconfig")
const router = require("./routes/index")
const socketconnection = require("./controller/sockethandler");
var cors = require('cors');
const responseHandler = require("./utils/responseHandler");


app.use(cors())
app.use(express.json());
app.use(responseHandler)


socketconnection(Server);

databaseConfiguration()
    .then((e) => console.log("Interview Service Connected To Database"))
    .catch((e) => console.log("Interview Service Failed To Connect To Database" + e));


app.use("/", router);
const PORT = 3001 || process.env.PORT;
Server.listen(PORT);


// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log(decoded);
