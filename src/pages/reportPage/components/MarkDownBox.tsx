import React from "react";
import Markdown from "react-markdown";
import s from "./Report.module.scss";

type MarkDownBoxProps = {
  research: string;
};

const MarkDownBox: React.FC<MarkDownBoxProps> = ({ research }) => {
  return (
    <div className={s.markdownBox}>
      <Markdown>{research}</Markdown>
    </div>
  );
};

export default MarkDownBox;
