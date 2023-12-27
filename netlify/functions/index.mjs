import finnhub from "finnhub";
import sql from "mssql";
import dotenv from "dotenv";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cm5em7pr01qjc6l4b2tgcm5em7pr01qjc6l4b2u0";

const tickers = [
  "AAPL",
  "ABBV",
  "ABT",
  "ACN",
  "ADBE",
  "AMD",
  "AMZN",
  "AVGO",
  "BAC",
  "BRK.B",
  "CAT",
  "CMCSA",
  "COST",
  "CRM",
  "CSCO",
  "CVX",
  "DHR",
  "DIS",
  "GOOG",
  "GOOGL",
  "HD",
  "INTC",
  "INTU",
  "JNJ",
  "JPM",
  "KO",
  "LIN",
  "LLY",
  "MA",
  "MCD",
  "META",
  "MRK",
  "MSFT",
  "NFLX",
  "NKE",
  "NVDA",
  "ORCL",
  "PEP",
  "PFE",
  "PG",
  "QCOM",
  "TMO",
  "TSLA",
  "TXN",
  "UNH",
  "V",
  "VZ",
  "WFC",
  "WMT",
  "XOM",
];

const curDate = new Date();
const date = `${curDate.getFullYear()}-${
  curDate.getMonth() + 1
}-${curDate.getDate()}`;

dotenv.config({ path: ".env.development" });

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = parseInt(process.env.AZURE_SQL_PORT);
const user = process.env.AZURE_SQL_USER;
const password = process.env.AZURE_SQL_PASSWORD;

const sqlConfig = {
  server,
  port,
  database,
  user,
  password,
  options: {
    encrypt: true,
  },
};

const quote = async function (symbl) {
  const finnhubClient = new finnhub.DefaultApi();
  return new Promise((resolve, reject) =>
    finnhubClient.quote(symbl, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  );
};

export const handler = async () => {
  try {
    await sql.connect(sqlConfig);
    for (const ticker of tickers) {
      const data = await quote(ticker);
      let curQuery = `INSERT INTO [dbo].[time_series] VALUES ('${ticker}','${date}',${data?.o},${data?.c},${data?.h},${data?.l});`;
      await sql.query(curQuery);
      console.log("Done", ticker);
      await sleep(500);
    }
    return {
      statusCode: 200,
      body: "sync complete",
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: "sync failed",
    };
  }
};
// export default async (req) => {
//   const { next_run } = await req.json();
// };

// export const config = {
//   schedule: "@daily",
// }
