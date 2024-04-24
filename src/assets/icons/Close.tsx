import { IconBaseProps } from "react-icons";
import { IoClose } from "react-icons/io5";

interface Props extends IconBaseProps {}

export const Close = (props: Props) => {
  return <IoClose size={props.size ?? 22} {...props} />;
};
