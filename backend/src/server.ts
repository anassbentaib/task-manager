import { config } from "dotenv";
config();

import app from "./app";

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
