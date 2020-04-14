const express = require("express");
const apiRouter = require("./routes");

const app = express();
app.use(express.json());

app.use("/", apiRouter);
app.use("/customers", apiRouter);
app.use("/customers/:id", apiRouter);
app.use("/authenticate/:username/:password", apiRouter);
app.use("/offices", apiRouter);

// Assign a PORT enviroment variable
const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
