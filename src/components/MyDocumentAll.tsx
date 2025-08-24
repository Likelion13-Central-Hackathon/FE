import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ItemState } from "../types/document";

Font.register({
  family: "MalgunGothic",
  fonts: [
    {
      src: `${import.meta.env.BASE_URL}fonts/malgun.ttf`,
      fontWeight: "normal",
    },
    {
      src: `${import.meta.env.BASE_URL}fonts/malgunbd.ttf`,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "MalgunGothic" },

  /* === 타이틀 영역 === */
  titleWrap: { marginBottom: 16 },
  titleEyebrow: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  titleRow: { flexDirection: "row", alignItems: "center" },
  titleAccent: {
    width: 4,
    height: 24,
    backgroundColor: "#2563EB",
    marginRight: 8,
  },
  titleText: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  titleRule: { marginTop: 6, height: 2, backgroundColor: "#2563EB" },

  /* === 문항(Question) 영역 === */
  questionWrap: { marginBottom: 16 },
  questionBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  questionBoxRow: { flexDirection: "row", alignItems: "center" },
  questionBar: {
    width: 3,
    height: 18,
    backgroundColor: "#2563EB",
    borderRadius: 2,
    marginRight: 8,
  },
  questionText: { fontSize: 14, color: "#111827" },

  /* 본문 섹션 */
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  text: { fontSize: 14, marginBottom: 5 },
  label: { fontWeight: "bold" },
});

const MyDocumentAll: React.FC<{ items: ItemState[] }> = ({ items }) => (
  <Document>
    {items.map((it, i) => (
      <Page key={i} size="A4" style={styles.page} wrap>
        {/* 페이지 제목 블록 */}
        <View style={styles.titleWrap}>
          <Text style={styles.titleEyebrow}>지원서류</Text>
          <View style={styles.titleRow}>
            <View style={styles.titleAccent} />
            <Text style={styles.titleText}>지원서류 길잡이</Text>
          </View>
          <View style={styles.titleRule} />
        </View>

        {/* 문항 블록 (라벨 제거, 박스만) */}
        <View style={styles.questionWrap}>
          <View style={styles.questionBox}>
            <View style={styles.questionBoxRow}>
              <View style={styles.questionBar} />
              <Text style={styles.questionText}>{it.title || "제목 없음"}</Text>
            </View>
          </View>
        </View>

        {/* 사용자 답변 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사용자 답변</Text>
          <Text style={styles.text}>
            {(it.userAnswer || "입력 없음").split("\n").map((line, idx) => (
              <Text key={idx}>
                {line}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>

        {/* AI 첨삭 답변 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI 첨삭 답변</Text>
          <Text style={styles.text}>
            {(it.aiAnswer || "내용 없음").split("\n").map((line, idx) => (
              <Text key={idx}>
                {line}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>

        {/* 질의응답 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>문항별 질의응답 예상 질문</Text>
          {it.qa.slice(0, 4).map((qa, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.text}>
                <Text style={styles.label}>Q{idx + 1}. </Text>
                {qa.question}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>A{idx + 1}. </Text>
                {qa.answer}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocumentAll;
