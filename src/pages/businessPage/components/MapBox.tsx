import React from "react";
import RegionButton from "./RegionButton";
import MAP from "../../../assets/images/map.svg";

const MapBox = () => {
  const regions = [
    { name: "서울", top: "20%", left: "23%" },
    { name: "인천", top: "15%", left: "10%" },
    { name: "경기", top: "28%", left: "27%" },
    { name: "충북", top: "33%", left: "40%" },
    { name: "충남", top: "46%", left: "16%" },
    { name: "세종", top: "41%", left: "32%" },
    { name: "대전", top: "46%", left: "40%" },
    { name: "강원", top: "13%", left: "60%" },
    { name: "전북", top: "57%", left: "29%" },
    { name: "전남", top: "76%", left: "28%" },
    { name: "광주", top: "70%", left: "15%" },
    { name: "경북", top: "47%", left: "73%" },
    { name: "경남", top: "67%", left: "51%" },
    { name: "대구", top: "58%", left: "59%" },
    { name: "울산", top: "65%", left: "78%" },
    { name: "부산", top: "72%", left: "69%" },
    { name: "제주", top: "92%", left: "11%" },
  ];

  return (
    <div style={{ position: "relative", width: "26.61vw", height: "40.21vw" }}>
      <img src={MAP} alt="map" style={{ width: "100%", height: "100%" }} />
      {regions.map((r) => (
        <RegionButton
          key={r.name}
          region={r.name}
          style={{
            position: "absolute",
            top: r.top,
            left: r.left,
          }}
        />
      ))}
    </div>
  );
};

export default MapBox;
