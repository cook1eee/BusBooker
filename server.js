const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig.js");
const port = process.env.PORT || 5000;
app.use(express.json());

const usersRouter = require("./routes/usersRoute");
const busesRouter = require("./routes/busesRoute.js");
const bookingsRouter = require("./routes/bookingsRoute.js");

app.use("/api/users", usersRouter);
app.use("/api/buses", busesRouter);
app.use("/api/bookings", bookingsRouter);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => console.log(`Node server listening on port ${port}!`));
