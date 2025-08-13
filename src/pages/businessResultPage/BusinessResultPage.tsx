import React from "react";
//import ResultItem from "./components/ResultItem";
import RANK1 from "../../assets/images/result-first.svg";
import RANK2 from "../../assets/images/result-second.svg";
import RANK3 from "../../assets/images/result-third.svg";
import RankItem from "./components/RankItem";
import data1 from "../../data/businessResultDummy.json";

const BusinessResultPage = () => {
  return (
    <div style={{ backgroundColor: "#ececec", marginTop: "50px" }}>
      <RankItem rankImg={RANK1} item={data1.data[0]} />
      <RankItem rankImg={RANK2} item={data1.data[1]} />
      <RankItem rankImg={RANK3} item={data1.data[2]} />
    </div>
  );
};

export default BusinessResultPage;
