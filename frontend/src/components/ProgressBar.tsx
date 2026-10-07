import { Text, View, ViewStyle } from "react-native";

import { bn } from "@/src/data/demo";
import { fonts, radius, spacing, makeStyles, useTheme } from "@/src/theme";

type ProgressBarProps = {
  progress: number; // 0..1
  height?: number;
  color?: string;
  showPercent?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function ProgressBar({ progress, height = 8, color, showPercent = false, style, testID }: ProgressBarProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const pct = Math.min(1, Math.max(0, progress));

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.track, { height }, { flex: 1 }]}>
        <View
          testID={testID}
          style={[styles.fill, { width: `${Math.round(pct * 100)}%`, height, backgroundColor: color ?? colors.brandPrimary }]}
        />
      </View>
      {showPercent ? (
        <Text style={[styles.percent, { color: color ?? colors.brandPrimary }]}>{bn(Math.round(pct * 100))}%</Text>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  track: {
    backgroundColor: colors.surfaceTertiary,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  fill: {
    borderRadius: radius.pill,
  },
  percent: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 20,
  },
}));