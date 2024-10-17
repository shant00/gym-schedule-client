import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { instance as axiosInstance } from "../helpers/axios/axiosInstance";
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const isAuthorized = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/verify`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  })

}

// export const getNewAccessToken = async () => {
//   return await axiosInstance({
//     url: `${getBaseUrl()}/auth/refresh-token`,
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   });
// };
