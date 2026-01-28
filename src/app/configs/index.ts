export const AppConfig = {
  upi: process.env.NEXT_PUBLIC_UPI_API!,
  nida: process.env.NEXT_PUBLIC_NIDA_API_URL!,
  accessCode: process.env.NEXT_PUBLIC_ACCESS_CODE!,
  irembo: {
    application: process.env.NEXT_PUBLIC_IREMBO_APPLICATION_API_URL!,
    findBill: process.env.NEXT_PUBLIC_IREMBO_FIND_BILL_API_URL!
  },
  forexExchange: process.env.NEXT_PUBLIC_FOLEX_EXCHANGE!,
  hikrlinkWebsiteId: process.env.NEXT_PUBLIC_HIKRLINK_WEBSITE_ID!,
  rssb: process.env.NEXT_PUBLIC_RSSB_API_URL!,
};
