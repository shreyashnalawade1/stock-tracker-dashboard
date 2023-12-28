import finnhub from "finnhub";
import sql from "mssql";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cm5em7pr01qjc6l4b2tgcm5em7pr01qjc6l4b2u0";

const curDate = new Date();
const date = `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${
  curDate.getDate() - 1
}`;

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
    const reqData = req.queryStringParameters;
    const ticker = reqData.ticker;
    const data = await quote(ticker);
    let curQuery = `INSERT INTO [dbo].[time_series] VALUES ('${ticker}','${date}',${data?.o},${data?.c},${data?.h},${data?.l});`;
    console.log(curQuery);
    const res = await sql.query(curQuery);
    console.log(res);
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
