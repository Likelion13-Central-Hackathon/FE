import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/BusinessResultPage.module.scss";
import RANK1 from "../../assets/images/result-first.svg";
import RANK2 from "../../assets/images/result-second.svg";
import RANK3 from "../../assets/images/result-third.svg";
import BACK from "../../assets/images/icon/back-icon.svg";
import RankItem from "./components/RankItem";
import data1 from "../../data/businessResultDummy.json";
import data2 from "../../data/businessDetailDummy.json";
import ResultItem from "./components/ResultItem";
import DetailButton from "./components/DetailButton";
import ScrollTopButton from "../../components/ScrollTopButton";

const BusinessResultPage = () => {
  const navigate = useNavigate();
  const resultRefs = useRef<Array<HTMLDivElement | null>>([]); // 스크롤 이동
  const rankIndex = [1, 0, 2] as const; // 랭킹 순서

  // 스크롤 이동 함수
  const scrollToResult = (idx: number) => {
    resultRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // 인덱스를 받아 ref 콜백 반환 -> 배열 해당 위치에 DOM 저장
  const setResultRef =
    (idx: number) =>
    (el: HTMLDivElement | null): void => {
      resultRefs.current[idx] = el;
    };

  return (
    <div className={s.businessResultWrapper}>
      <img
        src={BACK}
        alt="back-icon"
        className={s.backButton}
        onClick={() => navigate("/report")}
      />
      <div className={s.businessResultContainer}>
        {/* 상위 랭킹 3개 */}
        <div className={s.ranksThree}>
          <div className={s.rankBlock}>
            <RankItem rankImg={RANK2} item={data1.data[1]} />
            <DetailButton onClick={() => scrollToResult(rankIndex[0])} />
          </div>
          <div className={s.rankBlock}>
            <RankItem rankImg={RANK1} item={data1.data[0]} />
            <DetailButton onClick={() => scrollToResult(rankIndex[1])} />
          </div>
          <div className={s.rankBlock}>
            <RankItem rankImg={RANK3} item={data1.data[2]} />
            <DetailButton onClick={() => scrollToResult(rankIndex[2])} />
          </div>
        </div>

        {/* 선정될각, 전체사업 버튼 */}
        <div className={s.navigateButton}>
          <button onClick={() => navigate("/document")}>
            지원사업 선정될각?
          </button>
          <button onClick={() => navigate("/business")}>
            다른 지원사업 살펴볼각?
          </button>
        </div>

        {/* 상위 랭킹 3개 상세화면 */}
        <div className={s.resultsThree}>
          <div ref={setResultRef(0)} className={s.resultSection}>
            <ResultItem rankImg={RANK1} item={data2.data} />
          </div>
          <div ref={setResultRef(1)} className={s.resultSection}>
            <ResultItem rankImg={RANK2} item={data2.data} />
          </div>
          <div ref={setResultRef(2)} className={s.resultSection}>
            <ResultItem rankImg={RANK3} item={data2.data} />
          </div>
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default BusinessResultPage;
