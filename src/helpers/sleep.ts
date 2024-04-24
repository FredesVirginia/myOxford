// sleep 

export const sleep = (s: number = 1) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}