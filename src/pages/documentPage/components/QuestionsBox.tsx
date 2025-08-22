import React, { useState, forwardRef, useImperativeHandle } from 'react';
import s from './Document.module.scss';
import b from '../../../components/styles/Box.module.scss';
import ReportOutBox from '../../../components/ReportOutBox';
import ReportInBox from '../../../components/ReportInBox';
import type {
  QuestionsBoxHandle,
  ExtraProps,
  QAItem,
} from '../../../types/document';
import createAiQnaApi from '../../../api/document/createAiQnaApi';
import { aiAnswerSession$ } from '../../../utils/sessionStorage';
import LoadingSpinner from '../../../components/LoadingSpinner';

const QuestionsBox = forwardRef<QuestionsBoxHandle, ExtraProps>(
  ({ getAiAnswer, onRequireWarn, questionNumber }, ref) => {
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qaList, setQaList] = useState<QAItem[]>([]);

    useImperativeHandle(ref, () => ({
      getVisibleQA: () =>
        (started ? qaList.slice(0, 4) : []).map((q) => ({
          question: q.question,
          answer: q.answer,
        })),
    }));

    const fetchQna = async () => {
      const ai = (getAiAnswer?.() ?? '').trim();
      const aId = aiAnswerSession$(questionNumber).read();
      if (aId == null || Number.isNaN(aId)) {
        onRequireWarn?.();
        return;
      }

      if (!ai || !aId) {
        onRequireWarn?.();
      }

      setLoading(true);
      try {
        const items = await createAiQnaApi(aId);
        if (!items || items.length === 0)
          throw new Error('생성된 예상 질문이 없습니다.');
        setQaList(items);
        setStarted(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const handleStart = () => fetchQna();
    const handleRetry = () => fetchQna();

    return (
      <div className={s.questionBox}>
        <ReportOutBox width="12.97vw" height="5.63vw">
          <p className={s.infoText1}>
            {`AI 첨삭 이후, 답변에 따른\n예상 질문도 생성해 보세요!`}
          </p>
        </ReportOutBox>

        <ReportOutBox width="12.97vw" height="33.28vw" className={b.column}>
          <p className={s.infoText2}>문항별 질의응답 예상 질문</p>

          {started && (
            <button
              className={s.retryButton}
              onClick={loading ? undefined : handleRetry}
              disabled={loading}
            >
              {loading ? '생성 중...' : '다른질문 보기'}
            </button>
          )}

          <ReportInBox width="10.88vw" height="27.40vw">
            {!started && (
              <p
                className={s.makeButton}
                onClick={loading ? undefined : handleStart}
                aria-busy={loading}
              >
                {loading ? <LoadingSpinner /> : '생성하기'}
              </p>
            )}

            {started && (
              <div className={s.qaFourBox}>
                {qaList.slice(0, 4).map((q, i) => (
                  <React.Fragment key={i}>
                    <div className={s.qaItem}>
                      <span>Q. {q.question}</span>
                      <p>A. {q.answer}</p>
                    </div>
                    {i < 3 && <div>...</div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </ReportInBox>
        </ReportOutBox>
      </div>
    );
  }
);

QuestionsBox.displayName = 'QuestionsBox';
export default QuestionsBox;
