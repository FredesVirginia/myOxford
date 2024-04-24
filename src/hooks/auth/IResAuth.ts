export interface IResLogin {
  refresh:       string;
  access:        string;
  name:          string;
  english_level: string;
}

export interface IResRefresh {
  access: string;
}

export interface IErrorLogin {
  detail: string;
}

