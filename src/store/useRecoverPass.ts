import { create } from "zustand";

interface IRecoverPass {
  isRequestSent: boolean;
  setIsRequestSent: (isRequestSent: boolean) => void;
}

export const useRecoverPass = create<IRecoverPass>((set) => ({
  isRequestSent: false,
  setIsRequestSent: (isRequestSent: boolean) => set(() => ({ isRequestSent })),
}));
