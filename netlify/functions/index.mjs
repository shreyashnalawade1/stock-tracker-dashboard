import finnhub from "finnhub";

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

export default async (req) => {
  const { next_run } = await req.json();

  console.log("Received event! Next invocation at:", next_run);
};

export const config = {
  schedule: "@daily",
};
