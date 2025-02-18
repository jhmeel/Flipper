const Config = {
  PAYSTACK_SECRETE_KEY: "",
  WITHDRAWAL_WINDOW: { TUESDAY: 2, FRIDAY: 5 },
  PACKAGES: [
    {
      name: "GOLD",
      id: "XAU",
      price: 10_000,
      LROI: 30_000,
      ROC: 10,
    },
    {
      name: "PLATINUM",
      id: "XPT",
      price: 5_000,
      LROI: 15_000,
      ROC: 10,
    },
    {
      name: "SILVER", // package name
      id: "XAG", // package ID
      price: 2_000, // package price
      LROI: 6_000, //lifetime returns on investment
      ROC: 10, //returns on completion in % of package price
    },
  ],
  HOST: "",
  SOCIALS: {
    instagram: {
      url: "",
      name: "flipper",
    },
    facebook: {
      url: "",
      name: "flipper",
    },
    twitter: {
      url: "",
      name: "flipper",
    },
    linkedIn: {
      url: "",
      name: "flipper",
    },
  },
};

export default Config;
