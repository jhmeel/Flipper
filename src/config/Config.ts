const Config = {
  PAYSTACK_SECRETE_KEY:"sk_live_09d49950cb72bd38811e939163ef90f7d0e11bf2",
  PACKAGES: [
    {
      name: "GOLD",
      id: "XAU",
      price: 10_000,
      LROI: 30_000,
      ROC: 10,
      duration: "30",
    },
    {
      name: "PLATINUM",
      id: "XPT",
      price: 5_000,
      LROI: 15_000,
      ROC: 10,
      duration:'30',
    },
    {
      name: "SILVER", // package name
      id: "XAG", // package ID
      price: 2_000, // package price
      LROI: 6_000, //lifetime returns on investment
      ROC: 10, //returns on completion in %
      duration:'30',
    },
  ],
  HOST: "https://frontierscabal.onrender.com",
  SOCIALS: {
    instagram: {
      url: "https://instagram.com/frontierscabal?igshid=NTc4MTIwNjQ2YQ==",
      name: "frontierscabal",
    },
    facebook: {
      url: "https://www.facebook.com/profile.php?id=61552011542263",
      name: "frontierscabal",
    },
    twitter: {
      url: "https://x.com/frontiersc25471?s=20",
      name: "frontierscabal",
    },
    linkedIn: {
      url: "",
      name: "frontierscabal",
    },
  }
};

export default Config;
