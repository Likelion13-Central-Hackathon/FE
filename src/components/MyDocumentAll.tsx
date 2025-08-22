import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "NotoSansKR",
  src: `${import.meta.env.BASE_URL}fonts/malgun.ttf`,
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "NotoSansKR" },
  section: { marginBottom: 15 },
  title: { fontSize: 11, marginBottom: 10, color: "blue", fontWeight: "bold" },
  text: { fontSize: 10, marginBottom: 5 },
});

export type Snap = {
  title: string;
  userAnswer: string;
  aiAnswer: string;
  qa: { question: string; answer: string }[];
};

const MyDocumentAll: React.FC<{ items: Snap[] }> = ({ items }) => (
  <Document>
    {items.map((it, i) => (
      <Page key={i} size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <Text style={styles.title}>지원서류 길잡이</Text>
          <Text style={styles.text}>문항: {it.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>사용자 답변</Text>
          <Text style={styles.text}>
            {(it.userAnswer || "입력 없음").split("\n").map((line, idx) => (
              <Text key={idx}>
                {line}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>AI 첨삭 답변</Text>
          <Text style={styles.text}>
            {(it.aiAnswer || "내용 없음").split("\n").map((line, idx) => (
              <Text key={idx}>
                {line}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>문항별 질의응답 예상 질문</Text>
          {it.qa.slice(0, 4).map((qa, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.text}>
                Q{idx + 1}. {qa.question}
              </Text>
              <Text style={styles.text}>
                A{idx + 1}. {qa.answer}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocumentAll;
