const tickers = [
  "AAPL",
  "ABBV",
  "ABT",
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
  "WMT",
  "XOM",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req) => {
  const { next_run } = await req.json();
  for (const ticker of tickers) {
    fetch(
      `https://master--jade-cupcake-23e25c.netlify.app/.netlify/functions/index?ticker=${ticker}`
    );

    await sleep(80);
  }
};

export const config = {
  schedule: "@daily",
};
