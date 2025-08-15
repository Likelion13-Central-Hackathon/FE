import React from "react";
import RegionButton from "./RegionButton";
import MAP from "../../../assets/images/map.svg";
import { RegionName } from "../../../types/business";
import { regions } from "../../../data/businessData";

type MapBoxProps = {
  onRegionSelect: (region: RegionName) => void;
};

const MapBox: React.FC<MapBoxProps> = ({ onRegionSelect }) => {
  return (
    <div style={{ position: "relative", width: "26.61vw", height: "40.21vw" }}>
      <img src={MAP} alt="map" style={{ width: "100%", height: "100%" }} />
      {regions.map((r) => (
        <RegionButton
          key={r.name}
          region={r.name}
          onClick={() => onRegionSelect(r.name)}
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
