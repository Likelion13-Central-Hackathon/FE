import { SizeProps } from "./common";

export interface InBoxProps extends SizeProps {
  children?: React.ReactNode;
}

export interface OutBoxProps extends SizeProps {
  children?: React.ReactNode;
  className?: string;
}
