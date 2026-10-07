import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { TestCard } from "@/src/components/TestCard";
import { MOCK_TESTS } from "@/src/data/demo";
import { makeStyles, spacing, useTheme } from "@/src/theme";

export default function MockTests() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View testID="mock-tests-screen" style={styles.container}>
      <Header title="মডেল টেস্ট" subtitle="প্রমোশন বোর্ড স্ট্যান্ডার্ডের টাইমারসহ পরীক্ষা" />
      <Screen bottomPad={32}>
        <View style={styles.list}>
          {MOCK_TESTS.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onPress={() =>
                router.push(
                  test.isPremium ? "/premium" : `/mock-instructions?id=${test.id}` as never,
                )
              }
              testID={`mock-test-card-${test.id}`}
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