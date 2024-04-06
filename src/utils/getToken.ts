import { useSelector } from "react-redux";
import LocalForageProvider from "./localforage";

const useGetToken = (): Promise<string | undefined> => {
  const { accessToken } = useSelector((state: any) => state.user);

  const getToken = async (): Promise<string | undefined> => {
    try {
      const token = await LocalForageProvider.getAuthToken();
      return accessToken || token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  return getToken();
};

export default useGetToken