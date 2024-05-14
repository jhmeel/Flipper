interface ISupportedBank {
  name: string;
  code: string;
}

const SupportedBanks: ISupportedBank[] = [
  { name: "Access Bank", code: "044" },
  { name: "Zenith Bank", code: "057" },
  { name: "Guaranty Trust Bank (GTB)", code: "058" },
  { name: "First Bank of Nigeria", code: "011" },
  { name: "United Bank for Africa (UBA)", code: "033" },
  { name: "Ecobank Nigeria", code: "050" },
  { name: "Fidelity Bank", code: "070" },
  { name: "Union Bank", code: "032" },
  { name: "Stanbic IBTC Bank", code: "221" },
  { name: "Sterling Bank", code: "232" },
  { name: "Unity Bank", code: "215" },
  { name: "Wema Bank", code: "035" },
  { name: "Heritage Bank", code: "030" },
  { name: "Keystone Bank", code: "082" },
  { name: "Polaris Bank", code: "076" },
  { name: "First City Monument Bank (FCMB)", code: "214" },
  { name: "Standard Chartered Bank", code: "068" },
  { name: "CitiBank", code: "023" },
  { name: "Providus Bank", code: "101" },
  { name: "Jaiz Bank", code: "301" },
  { name: "FSDH Merchant Bank", code: "601" },
  { name: "Nova Merchant Bank", code: "305" },
  { name: "Keystone Bank", code: "082" },
  { name: "Polaris Bank", code: "076" },
  { name: "SunTrust Bank", code: "100" },
  { name: "Globus Bank", code: "001" },
  { name: "Coronation Merchant Bank", code: "559" },
  { name: "Rand Merchant Bank", code: "501" },
  { name: "Providus Bank", code: "101" },
  { name: "Jaiz Bank", code: "301" },
  { name: "FSDH Merchant Bank", code: "601" },
  { name: "Nova Merchant Bank", code: "305" },
  { name: "Keystone Bank", code: "082" },
  { name: "Polaris Bank", code: "076" },
  { name: "Kuda Microfinance Bank", code: "000" },
  { name: "Opay Microfinance Bank", code: "000" },
  { name: "Moniepoint Microfinance Bank", code: "0000" },
  { name: "Palmpay Microfinance Bank", code: "0000" },
];

export { SupportedBanks };
