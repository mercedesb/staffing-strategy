require("dotenv").config();

const {app} = require("./app")

const PORT = process.env.PORT || 5000;

// start express server
app.listen(PORT, () => console.log(`server started of port ${PORT}`));
