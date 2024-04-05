import { useSelector } from "react-redux";
import LocalForageProvider from "./localforage";

const GetToken = async (): Promise<string | undefined> => {
  const { accessToken } = useSelector((state: any) => state.user);
  try {
    const token = await LocalForageProvider.getAuthToken();
    return accessToken || token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export default GetToken;
