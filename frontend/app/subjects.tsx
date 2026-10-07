import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { SubjectCard } from "@/src/components/SubjectCard";
import { SUBJECTS, bn } from "@/src/data/demo";
import { makeStyles, spacing, useTheme } from "@/src/theme";

export default function Subjects() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View testID="subjects-screen" style={styles.container}>
      <Header
        title="বিষয়সমূহ"
        subtitle={`${bn(SUBJECTS.length)}টি বিষয় · ${bn(SUBJECTS.reduce((a, s) => a + s.questions, 0))}টি প্রশ্ন`}
      />
      <Screen bottomPad={32}>
        <View style={styles.list}>
          {SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onPress={() => router.push(`/subject-details?id=${subject.id}`)}
              testID={`subject-card-${subject.id}`}
            />
          ))}
        </View>
      </Screen>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
}));