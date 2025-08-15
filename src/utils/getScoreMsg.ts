// 점수(angle)에 따라 달라지는 멘트
export function getAngleMessage(angle: number): string {
  if (angle >= 170) {
    return "완벽에 가깝습니다! 바로 실행해도 됩니다.";
  } else if (angle >= 150) {
    return "창업 준비 완료! 세부적인 내용만 조정해 봐요!";
  } else if (angle >= 120) {
    return "좋습니다. 약간의 보완으로 완성도 UP!";
  } else if (angle >= 90) {
    return "기본기 탄탄! 실행 전략을 강화하세요.";
  } else if (angle >= 60) {
    return "좋은 아이디어네요. 하지만, 보강이 필요해요.";
  } else if (angle >= 30) {
    return "초기 단계 진입은 성공! 이제는 전략 재정비";
  } else {
    return "첫걸음 시작! 기초부터 다져가세요.";
  }
}
