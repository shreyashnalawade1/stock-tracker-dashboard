import finnhub from "finnhub";
import sql from "mssql";

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
const date = `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${
  curDate.getDate() - 1
}`;

console.log(date);
const server = "competitor-price-analysis.database.windows.net";
const database = "competitor-analysis";
const port = 1433;
const user = "root-";
const password = "foxiscoming123@";

const sqlConfig = {
  server,
  port,
  database,
  user,
  password,
  options: {
    database,
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

export const handler = async (req) => {
  try {
    await sql.connect(sqlConfig);
    // for (const ticker of tickers) {
    const reqData = req.queryStringParameters;
    const ticker = reqData.ticker;
    const data = await quote(ticker);
    let curQuery = `INSERT INTO [dbo].[time_series] VALUES ('${ticker}','${date}',${data?.o},${data?.c},${data?.h},${data?.l});`;
    sql.query(curQuery);
    console.log(date);
    console.log("Done", ticker);

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
