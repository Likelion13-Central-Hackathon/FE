// InfoForm(나이, 주소(시,구), 재학 여부, 학교명, 학적상태)

import { AcademicStatus, FormData } from "../../types/form";

export type InfoPayload = {
  age: number;
  addressCity: string;
  addressDistrict: string;
  isEnrolled: boolean;
  university: string | null;
  academicStatus: AcademicStatus | null;
};

export function infoFormPayload(data: FormData): InfoPayload {
  // age 숫자 변환
  const ageNum = Number(String(data.age).replace(/\D/g, ""));
  if (!Number.isFinite(ageNum) || ageNum <= 0) {
    throw new Error("나이를 숫자로 입력해주세요.");
  }

  // 주소 정규화
  const city = (data.addressCity || "").trim();
  const district = (data.addressDistrict || "").trim();
  if (!city || !district) {
    throw new Error("사업장 주소(시/도, 시/군/구)를 모두 선택해주세요.");
  }

  // 대학교 재학 여부
  const enrolled = data.isEnrolled === true;

  // 대학명과 학적 상태
  const uni = enrolled ? (data.university ?? "").trim() || null : null;
  const status: AcademicStatus | null = enrolled
    ? data.academicStatus ?? null
    : null;

  return {
    age: ageNum,
    addressCity: city,
    addressDistrict: district,
    isEnrolled: enrolled,
    university: uni,
    academicStatus: status,
  };
}
