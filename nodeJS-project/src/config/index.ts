import { config } from "dotenv";

const configDotEnv = () => {
  // load the main/general .env file
  config({ path: "src/config/.env" });

  const mode = process.env.NODE_ENV; //dev|test|prod
  console.log("The App is running in", mode, "Mode");
  console.log("Config File:", `src/config/${mode}.env`);

  //load the config file:
  config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;
export { configDotEnv };
