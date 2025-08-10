import React from "react";

interface IconButtonProps {
  imgSrc: string;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({ imgSrc, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img src={imgSrc} />
      <p style={{ fontSize: "0.73vw", fontWeight: "500", color: "#757575" }}>
        {text}
      </p>
    </div>
  );
};

export default IconButton;
