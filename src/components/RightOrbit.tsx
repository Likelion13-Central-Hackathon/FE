import React from 'react';
import s from './styles/RightOrbit.module.scss';

type PointPos = React.CSSProperties;
const KEYS = ['t1', 't2', 't3', 't4', 't5'] as const;
type TickKey = (typeof KEYS)[number];

type Props = {
  /* 라벨 개수: 3 또는 5개 모두 허용 */
  labels?: string[];
  /* 좌표/회전: 필요한 키만 넘기면 됨 (t1~t5) */
  positions?: Partial<Record<TickKey, PointPos>>;
  /* 어떤 점을 활성으로 표시할지 (기본: 가운데 1) */
  activeIndex?: number;
  size?: 'sm' | 'md';
  showLabels?: boolean;
  side?: 'left' | 'right';
  top?: string;
};

const RightOrbit: React.FC<Props> = ({
  labels = ['창업지원 및 자원', '인적사항', '창업내용'],
  positions,
  activeIndex = 1,
  showLabels = true,
  side = 'right',
  top = '6vw',
}) => {
  // labels 길이에 맞춰 t1~t5 중 필요한 만큼만 렌더
  const count = Math.min(labels.length, KEYS.length);
  const keys = KEYS.slice(0, count) as TickKey[];

  return (
    <div
      className={`${s.ring} ${side === 'left' ? s.sideLeft : s.sideRight}`}
      style={{ top: top }}
    >
      {keys.map((key, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={key}
            className={`${s.tick} ${s[key] ?? ''}`}
            style={positions?.[key]}
          >
            {showLabels && (
              <span className={`${s.label} ${isActive ? '' : s.dim}`}>
                {labels[i] ?? ''}
              </span>
            )}
            <span className={`${s.dot} ${isActive ? s.on : ''}`} />
          </div>
        );
      })}
    </div>
  );
};

export default RightOrbit;
