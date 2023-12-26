const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cm5em7pr01qjc6l4b2tgcm5em7pr01qjc6l4b2u0";
const finnhubClient = new finnhub.DefaultApi();

const quote = async function (symbl) {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbl, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

exports.handler = async () => {
  const data = await quote("AAPL");
  return {
    statusCode: 200,
    body: data?.o,
  };
};

exports.handler();
