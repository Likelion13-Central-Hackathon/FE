// 모집 여부 포맷팅
export enum RecruitmentStatus {
  OPEN = "모집 중",
  CLOSED = "모집 중 아님",
}

export const formatRecruiting = (isRecruiting: boolean) => {
  return isRecruiting ? RecruitmentStatus.OPEN : RecruitmentStatus.CLOSED;
};

// https 붙이기
export const normalizeUrl = (url: string) => {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url; // 기본적으로 https 붙여줌
  }
  return url;
};

export const linkify = (text: string) => {
  // URL 변환
  let replaced = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" style="text-decoration: underline; color: gray;">$1</a>'
  );

  // 이메일 변환
  replaced = replaced.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1" style="text-decoration: underline; color: gray;">$1</a>'
  );

  return replaced;
};
