import { oxfordApi } from "../../api/oxfordApi";
import { IResLogin, IResRefresh } from "./IResAuth";

export interface ICredentials {
  email: string;
  password: string;
}
export const login = async (credentials: ICredentials): Promise<IResLogin> => {
  try {
    const data = await oxfordApi.post("/login/", credentials);
    return data.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export interface IRefresh {
  refresh?: string;
}
export const refresh = async (payload?: IRefresh): Promise<IResRefresh> => {
  const data = await oxfordApi.post("/api/token/refresh/", payload);
  return data.data;
};
