import myColors from "../../CustomColors.json"  

export type TBackgroundLayout =
  | "login"
  | "recover-password"
  | "change-password"
  | "match-columns"
  | "true-false"
  | "unscramble"
  | "fill-the-blanks"
  | "drang-and-drop"
  | "pick-list"
  |  "sortable"
  | "open"
  
  | "multiple-choice"
  | "fill-the-blanks";

export const COLORS = myColors;
export type TColor = keyof typeof myColors;
