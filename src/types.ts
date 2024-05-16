/* eslint-disable @typescript-eslint/no-explicit-any */
export type ROLE = "FP:ADMIN" | "FP:USER";
export const taskStatus = {
  PENDING: 0,
  INPROGRESS: 0.5,
  COMPLETED: 1,
};
export interface Package {
  id?: string;
  name?: string;
  price?: number | string;
  LROI?: number;
  ROC?: number;
}
export interface Task {
  _id: string;
  variant: "social" | "typical";
  name?: string;
  instruction?: string;
  status?: number;
  expires_at?: number | string;
}
export interface ACTION {
  type: string;
  payload?: any;
}
export interface Ads {
  title?: string;
  brand?: string;
  content?: string;
  image?: string;
  url?: string;
  createdAt?: string;
}
export type ARTICLE = {
  title?: string;
  content?: string;
  slug?: string;
  image?: string;
  description?: string;
  readDuration?: string;
  category?: string;
};

export interface IWALLET {
  userId?: string;
  balance?: number;
  referralBonus?: number;
  txHistory?: any[];
  withdrawable?: number;
  TAB?: number;
  pId?: "XAU" | "XPT" | "XAG";
  txPasscode?: string;
  dailyTasks?: {
    progress?: number;
    tasks?: any[];
  };
  completedTask?: any[];
  pendingVerifications?: {
    id: string;
    doc: {
      secureUrl: string;
      publicId: string;
    };
    submissionDate: Date;
  }[];
  expiresAt?: number;
  createdAt?: Date;
}

export interface ROOT_STATE {
  user: {
    loading?: boolean;
    isAuthenticated?: boolean;
    user?: USER;
    token?: string;
    wallet?: IWALLET;
    txHistory?: any;
    weeklyCumulation?: any;
    error?: any;
  };
  password: {
    loading?: boolean;
    message?: string;
    success?: boolean;
    otp?: number;
    email?: string;
    expiresAt?: number | string | Date;
    error?: any;
  };

  profile: {
    loading?: boolean;
    isUpdated?: boolean;
    error?: any;
  };
  package: {
    loading?: boolean;
    isActivated?: boolean;
    wallet?: any;
    error?: any;
  };
  task: {
    loading?: boolean;
    progress?: number;
    tasks?: Array<Task>;
    isVerified?: boolean;
    error?: any;
  };
  wallet: {
    loading?: boolean;
    wallet?: IWALLET;
    tillLastweekCumulation?: any;
    message?: string;
    error?: any;
  };
}

export type USER = {
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bankinfo?: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  role?: ROLE;
  referredBy?: USER;
  referrals?: Array<USER>;
  referralCode?: string;
  activity_logs?: Array<string>;
  createdAt?: Date;
};
