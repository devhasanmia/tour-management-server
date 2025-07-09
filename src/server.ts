import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(config.db as string)
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
