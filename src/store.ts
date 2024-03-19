import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE, 
  REGISTER,
} from "reduxjs-toolkit-persist";
import localForage from "localforage";
import {
  passwordReducer,
  profileReducer,
  userReducer,
  packageReducer,
  walletReducer,
} from "./reducers/user";
import { taskReducer } from "./reducers/task";

const reducer = combineReducers({
  user: userReducer,
  password: passwordReducer,
  profile: profileReducer,
  package: packageReducer,
  wallet:walletReducer,
  task: taskReducer
});

interface CustomLocalForage extends LocalForage {
  getAllKeys(callback?: (keys: string[]) => void): Promise<string[]>;
}

const customLocalForage: CustomLocalForage = localForage as CustomLocalForage;

localForage.config({
  name: "flipper",
  storeName: "state",
  version: 1,
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  size: 200 * 1024 * 1024,
});

const persistConfig: PersistConfig = {
  key: "root",
  storage: customLocalForage,
  whitelist: ["user", "profile", "package", "password", "wallet", "task"],
};

// Create a persisted reducer using persistReducer
const persistedReducer = persistReducer(persistConfig, reducer); // Assuming reducer is correctly defined


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
