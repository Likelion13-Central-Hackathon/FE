import React from "react";
import ResultItem from "./components/ResultItem";
import RANK1 from "../../assets/images/result-first.svg";

const BusinessResultPage = () => {
  return (
    <div style={{ backgroundColor: "#ececec", marginTop: "50px" }}>
      <ResultItem rankImg={RANK1} />
    </div>
  );
};

export default BusinessResultPage;
