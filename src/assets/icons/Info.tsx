import { IconBaseProps } from "react-icons";
import { FaInfoCircle } from "react-icons/fa";

interface Props extends IconBaseProps {}

export const Info = (props: Props) => {
  return <FaInfoCircle size={props.size ?? 22} {...props} />;
};
