import { useMutation, useQuery } from "@tanstack/react-query";
import { ICredentials, IRefresh, login, refresh } from "./requests";
import { IErrorLogin, IResLogin } from "./IResAuth";

export const useLogin = () => {
  const queryLogin = useMutation<IResLogin, IErrorLogin, ICredentials>({
    mutationFn: (credentials: ICredentials) => login(credentials),
  });

  return { queryLogin };
};

const intervalRefresh = 4 * 60 * 60 * 1000; // 4 horas

export const useRefresh = (payload?: IRefresh) => {
  const queryRefresh = useQuery({
    queryKey: ["refresh"],
    queryFn: () => refresh(payload),
    enabled: !!payload,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,

    // Refrescar el token cada 4 horas
    refetchInterval: intervalRefresh,
    staleTime: intervalRefresh,
  });
  return { queryRefresh };
};
