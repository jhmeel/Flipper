import LocalForageProvider from "./localforage";

const getToken = async (): Promise<string | undefined> => {
  try {
    const token = await LocalForageProvider.getAuthToken();
    if (!token) {
      const bc = new BroadcastChannel("EVENT");
      bc.postMessage({
        type: "JWT_EXPIRED",
      });
      return;
    }

    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    const bc = new BroadcastChannel("EVENT");
    bc.postMessage({
      type: "JWT_EXPIRED",
    });
    return null;
  }
};

export default getToken;
