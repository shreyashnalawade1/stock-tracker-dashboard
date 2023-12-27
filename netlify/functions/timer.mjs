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

export default async (req) => {
  const { next_run } = await req.json();
  for (const ticker of tickers) {
    fetch(
      `https://master--jade-cupcake-23e25c.netlify.app/.netlify/functions/index?ticker=${ticker}`
    );
  }
};

export const config = {
  schedule: "@daily",
};
