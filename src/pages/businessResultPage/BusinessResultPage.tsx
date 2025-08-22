import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/BusinessResultPage.module.scss";
import RANK1 from "../../assets/images/result/result-first.svg";
import RANK2 from "../../assets/images/result/result-second.svg";
import RANK3 from "../../assets/images/result/result-third.svg";
import BACK from "../../assets/images/icon/back-icon.svg";
import RankItem from "./components/RankItem";
import ResultItem from "./components/ResultItem";
import DetailButton from "./components/DetailButton";
import ScrollTopButton from "../../components/ScrollTopButton";
import { RankItemDetail } from "../../types/business";
import { reportSession } from "../../utils/sessionStorage";
import getRecomBusinessApi from "../../api/business/getRecomBusinessApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const BusinessResultPage = () => {
  const navigate = useNavigate();
  const resultRefs = useRef<Array<HTMLDivElement | null>>([]); // 스크롤 이동

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<RankItemDetail[]>([]); // Top3 상세 스키마 배열

  // Top3 불러오기
  useEffect(() => {
    const reportId = reportSession.read();
    if (!reportId) {
      setLoading(false);
      return;
    }

    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        // 추천 창업 지원사업 목록 조회 api 호출
        const list = await getRecomBusinessApi(reportId);
        if (ignore) return;
        setItems(Array.isArray(list) ? list.slice(0, 3) : []);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

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

  if (loading) {
    return (
      <div className={s.businessResultWrapper}>
        <div className={s.businessResultContainer}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // 들어온 데이터
  const i0 = items[0]; // 1위
  const i1 = items[1]; // 2위
  const i2 = items[2]; // 3위

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
            {i1 && <RankItem rankImg={RANK2} item={i1} />}
            <DetailButton onClick={() => scrollToResult(1)} />
          </div>
          <div className={s.rankBlock}>
            {i0 && <RankItem rankImg={RANK1} item={i0} />}
            <DetailButton onClick={() => scrollToResult(0)} />
          </div>
          <div className={s.rankBlock}>
            {i2 && <RankItem rankImg={RANK3} item={i2} />}
            {i2 && <DetailButton onClick={() => scrollToResult(2)} />}
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
            {i0 && <ResultItem rankImg={RANK1} item={i0} />}
          </div>
          <div ref={setResultRef(1)} className={s.resultSection}>
            {i1 && <ResultItem rankImg={RANK2} item={i1} />}
          </div>
          <div ref={setResultRef(2)} className={s.resultSection}>
            {i2 && <ResultItem rankImg={RANK3} item={i2} />}
          </div>
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default BusinessResultPage;
