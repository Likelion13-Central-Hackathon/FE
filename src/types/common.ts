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

export interface ExplationBox {
  imgSrc: string;
  width?: string;
  title: string;
  text: string;
}
