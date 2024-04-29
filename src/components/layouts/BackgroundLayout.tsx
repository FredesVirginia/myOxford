import React from "react";
import BACK_LOGIN from "../../assets/auth/back.svg";
import BACK_CHANGE_PASSWORD from "../../assets/auth/yellow-back.png";
import BG_DRANG_AND_DROP from "../../assets/backgrounds/bg-drag-and-drop.png";
import BG_FILL_BLANKS from "../../assets/backgrounds/bg-fillBlanks.svg";
import BG_MATCH_COLUMNS from "../../assets/backgrounds/bg-matchColumns.svg";
import BG_MULTIPLE_CHOICE from "../../assets/backgrounds/bg-multipleC.svg";
import BG_OPEN from "../../assets/backgrounds/bg-open.png";
import BG_PICK_LIST from "../../assets/backgrounds/bg-pick-list.svg";
import BG_SORTABLE from "../../assets/backgrounds/bg-sotable.png";
import BG_TRUE_FALSE from "../../assets/backgrounds/bg-trueFalse.svg";
import BG_SPEAKING from "../../assets/backgrounds/bg-speaking.png";
import BG_UNSCRAMBLE from "../../assets/backgrounds/bg-unscramble.svg";
import { TBackgroundLayout } from "../../types/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  theme?: TBackgroundLayout;
  mask?: React.ReactNode;
}

export const BackgroundLayout: React.FC<Props> = ({ theme = "login", mask, children, ...props }) => {
  const getTheme = () => {
    switch (theme) {
      case "login":
        return "bg-login";
      case "recover-password":
        return "bg-recover-password";
      case "change-password":
        return "bg-change-password";
      case "match-columns":
        return "bg-primary-match-columns-200";
      case "unscramble":
        return "bg-my-brown-900";
      case "fill-the-blanks":
        return "bg-my-yellow-400";
      case "true-false":
        return "bg-pink-400";
      case "drang-and-drop" :
        return  "bg-my-blue-200"

      case "pick-list" : 
        return "bg-my-pick-list"

      case "sortable" :
        return "bg-my-green-sortable-strong"

      case "open" :
        return "bg-my-open-rose"
      case "multiple-choice":
        return "bg-my-blue-900";
      
      case "speaking" : 
        return "bg-my-speaking-primary";
    }
  };

  const getImg = () => {
    switch (theme) {
      case "login":
        return BACK_LOGIN;
      case "recover-password":
        return BACK_LOGIN;
      case "change-password":
        return BACK_CHANGE_PASSWORD;
      case "match-columns":
        return BG_MATCH_COLUMNS;
      case "unscramble":
        return BG_UNSCRAMBLE;
      case "fill-the-blanks":
        return BG_FILL_BLANKS;
      case "multiple-choice":
        return BG_MULTIPLE_CHOICE;
      case "true-false":
        return BG_TRUE_FALSE;
      
      case "drang-and-drop" :
        return BG_DRANG_AND_DROP; 

      case "pick-list" :
        return BG_PICK_LIST;

      case  "sortable" : 
          return BG_SORTABLE;

      case "open" :
         return BG_OPEN;
       
      case "speaking" :
          return BG_SPEAKING
    }
  };

  return (
    <div className={`h-screen m-auto relative flex items-center ${getTheme()}`} {...props}>
      <img src={getImg()} alt="back" className="absolute w-full h-full object-cover " />
      <div className="z-10 w-full">{children}</div>
      {mask}
    </div>
  );
};
