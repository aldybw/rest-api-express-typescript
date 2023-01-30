import dotenv from "dotenv";

dotenv.config();

export default {
  port: 1337,
  dbUri: "mongodb://127.0.0.1:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: `${process.env.PUBLIC_KEY}`,
  privateKey: `${process.env.PRIVATE_KEY}`,
};
