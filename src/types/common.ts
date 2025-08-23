// 이미지 가로, 세로
export interface SizeProps {
  width?: string;
  height?: string;
}

export interface SizeTextProps {
  width?: string;
  height?: string;
  text?: string;
}

export interface LinkProps {
  link?: string;
}

export interface Explation {
  title: string;
  text: string;
}

export interface ExplationBoxProps extends Explation {
  imgSrc: string;
  width?: string;
}

export interface ScrollTextBoxProps extends Explation {
  subTitle: string;
  direction?: string;
  alignment?: string;
  marginTop?: string;
}
