import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/BusinessPage.module.scss";
import b from "../../components/styles/Box.module.scss";
import BACK from "../../assets/images/icon/back-icon.svg";
import CHAR from "../../assets/images/character-2d.png";
import MapBox from "./components/MapBox";
import ReportOutBox from "../../components/ReportOutBox";
import BusinessItem from "./components/BusinessItem";
//import data from "../../data/businessDummy.json";
import { BusinessItemProps } from "../../types/business";
import getAllBusinessApi from "../../api/business/getAllBusinessApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageNavigation from "./components/PageNavigation";

const PAGE_SIZE = 5; // 페이지 당 아이템 개수
const WINDOW_SIZE = 4; // 페이지네이션 숫자 개수

const BusinessPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("서울"); // 선택된 지역
  const [page, setPage] = useState(0); // 페이지
  const [items, setItems] = useState<BusinessItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [cache, setCache] = useState<Record<number, BusinessItemProps[]>>({}); // 페이지 캐시
  const [maxKnownPage, setMaxKnownPage] = useState(0); // 지금까지 발견한 최대 페이지
  const [windowStart, setWindowStart] = useState(0); // 시작 인덱스(슬라이딩)

  // region이 바뀌면 초기화
  useEffect(() => {
    setPage(0);
    setCache({});
    setMaxKnownPage(0);
    setWindowStart(0);
  }, [region]);

  // page, region이 바뀔 때마다 조회 api 호출
  useEffect(() => {
    // 컴포넌트가 언마운트 될때 fetch 요청 취소
    const controller = new AbortController();

    // 캐시에 현재 페이지가 있으면 API 호출 생략
    if (cache[page]) {
      setItems(cache[page]);
      return () => controller.abort();
    }

    (async () => {
      try {
        setLoading(true);

        // 창업 지원사업 목록 조회 api 호출
        const data = await getAllBusinessApi(page, PAGE_SIZE, region);
        setCache((prev) => ({ ...prev, [page]: data }));
        setItems(data);
        // 지금까지의 최대 페이지 갱신
        setMaxKnownPage((prev) => Math.max(prev, page));
      } catch {
        console.log("BusinessPage useEffect Error");
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [page, region, cache]);

  // 이전, 다음버튼 활성화 조건
  const canPrev = page > 0;
  const canNext = items.length === PAGE_SIZE;

  // 숫자 버튼(슬라이딩 윈도우) 최대 4개
  const end = Math.min(windowStart + WINDOW_SIZE - 1, maxKnownPage);
  const pageButtons: number[] = [];
  for (let i = windowStart; i <= end; i++) pageButtons.push(i);

  // 이전 페이지 이동
  const goPrev = () => {
    if (!canPrev) return;
    setPage((p) => {
      const next = Math.max(0, p - 1);
      setWindowStart((ws) => (next < ws ? Math.max(0, ws - 1) : ws));
      return next;
    });
  };

  // 다음 페이지 이동
  const goNext = () => {
    if (!canNext) return;
    setPage((p) => {
      const next = p + 1;
      setWindowStart((ws) => {
        const winEnd = ws + WINDOW_SIZE - 1;
        return next > winEnd ? ws + 1 : ws;
      });
      return next;
    });
  };

  // 특정 페이지로 이동
  const goPage = (p: number) => {
    if (p === page) return;
    setWindowStart((ws) => {
      const winEnd = ws + WINDOW_SIZE - 1;
      if (p < ws) return p;
      if (p > winEnd) return p - (WINDOW_SIZE - 1);
      return ws;
    });
    setPage(p);
  };

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
              setPage(0);
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
              onNext={goNext}
              onPage={goPage}
            />
          </ReportOutBox>
        </section>
      </div>
    </div>
  );
};

export default BusinessPage;
