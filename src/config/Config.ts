const Config = {
  PAYSTACK_SECRETE_KEY: "pk_test_64f68f5cd8d1edfcf88de19bce88c2a9b837415b",
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
      url: "https://instagram.com/flipper?igshid=NTc4MTIwNjQ2YQ==",
      name: "flipper",
    },
    facebook: {
      url: "https://www.facebook.com/profile.php?id=61552011542263",
      name: "flipper",
    },
    twitter: {
      url: "https://x.com/frontiersc25471?s=20",
      name: "flipper",
    },
    linkedIn: {
      url: "",
      name: "flipper",
    },
  },
};

export default Config;
