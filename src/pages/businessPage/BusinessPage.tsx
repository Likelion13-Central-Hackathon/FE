import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/BusinessPage.module.scss";
import b from "../../components/styles/Box.module.scss";
import BACK from "../../assets/images/icon/back-icon.svg";
import CHAR from "../../assets/images/character-2d.png";
import MapBox from "./components/MapBox";
import ReportOutBox from "../../components/ReportOutBox";
import BusinessItem from "./components/BusinessItem";
import { BusinessItemProps } from "../../types/business";
import getAllBusinessApi from "../../api/business/getAllBusinessApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageNavigation from "./components/PageNavigation";
import usePagination from "../../hooks/usePagenation";

const PAGE_SIZE = 5; // 페이지 당 아이템 개수
const WINDOW_SIZE = 4; // 페이지네이션 숫자 개수

const BusinessPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("서울"); // 선택된 지역
  const [items, setItems] = useState<BusinessItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [cache, setCache] = useState<Record<number, BusinessItemProps[]>>({}); // 페이지 캐시

  const {
    page,
    pageButtons,
    canPrev,
    goPrev,
    goNext,
    goPage,
    ackKnown,
    reset: resetPagination,
  } = usePagination({ windowSize: WINDOW_SIZE });

  // region이 바뀌면 초기화
  useEffect(() => {
    resetPagination();
    setCache({});
  }, [region, resetPagination]);

  // page, region이 바뀔 때마다 조회 api 호출
  useEffect(() => {
    // 컴포넌트가 언마운트 될때 fetch 요청 취소
    const controller = new AbortController();

    // 캐시에 현재 페이지가 있으면 API 호출 생략
    if (cache[page]) {
      setItems(cache[page]);
      ackKnown(page);
      return () => controller.abort();
    }

    (async () => {
      try {
        setLoading(true);

        // 창업 지원사업 목록 조회 api 호출
        const data = await getAllBusinessApi(page, PAGE_SIZE, region);
        setCache((prev) => ({ ...prev, [page]: data }));
        setItems(data);
        ackKnown(page); // 이 페이지까지 존재 확정
      } catch {
        console.log("BusinessPage useEffect Error");
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [page, region, cache, ackKnown]);

  // 다음버튼 활성화 조건
  const canNext = items.length === PAGE_SIZE;

  return (
    <div className={s.businessWrapper}>
      <img
        src={BACK}
        alt="back-icon"
        className={s.backButton}
        onClick={() => navigate("/business/result")}
      />
      <div className={s.businessContainer}>
        <section className={s.titleBox}>
          <p className={s.businessTitle}>2025년 청년지원사업 통합 공고</p>
          <p className={s.businessSubTitle}>지방자치단체</p>
        </section>

        <section className={s.businessBox}>
          <MapBox
            onRegionSelect={(r) => {
              setRegion(r);
            }}
          />
          <ReportOutBox width="48.80vw" height="41.35vw" className={b.column}>
            <p className={s.regionFilter}>지역 | {region}</p>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className={s.businessItems}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <BusinessItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      region={item.region}
                      supportArea={item.supportArea}
                      link={item.link}
                    />
                  ))
                ) : (
                  <p className={s.noDataMessage}>
                    현재 모집 중인 지원사업이 없어요!
                    <img src={CHAR} alt="char-2d" style={{ width: "9vw" }} />
                  </p>
                )}
              </div>
            )}
            {/* 페이지네이션 */}
            <PageNavigation
              page={page}
              pageButtons={pageButtons}
              canPrev={canPrev}
              canNext={canNext}
              onPrev={goPrev}
              onNext={() => goNext({ canNext })}
              onPage={goPage}
            />
          </ReportOutBox>
        </section>
      </div>
    </div>
  );
};

export default BusinessPage;
