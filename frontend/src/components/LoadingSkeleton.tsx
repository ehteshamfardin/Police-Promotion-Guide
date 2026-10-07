import { useEffect, useRef } from "react";
import { Animated, Easing, View, ViewStyle } from "react-native";

import { radius, makeStyles, useTheme } from "@/src/theme";

type SkeletonProps = {
  width?: number | `${number}%`;
  height?: number;
  circle?: boolean;
  style?: ViewStyle;
  testID?: string;
};

// Single shimmering skeleton block.
export function Skeleton({ width = "100%", height = 16, circle = false, style, testID }: SkeletonProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const shimmer = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.9, duration: 700, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.4, duration: 700, easing: Easing.linear, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.base,
        {
          width,
          height,
          backgroundColor: colors.surfaceTertiary,
          borderRadius: circle ? radius.pill : radius.sm,
          opacity: shimmer,
        },
        style,
      ]}
    />
  );
}

type LoadingSkeletonProps = {
  rows?: number;
  testID?: string;
};

// Card-style skeleton list used while loading.
export function LoadingSkeleton({ rows = 3, testID }: LoadingSkeletonProps) {
  const styles = useStyles();
  return (
    <View style={{ gap: 16 }} testID={testID}>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={styles.row}>
          <Skeleton width={48} height={48} circle />
          <View style={styles.lines}>
            <Skeleton width="70%" height={14} />
            <Skeleton width="45%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles(() => ({
  base: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
  },
  lines: {
    flex: 1,
    gap: 8,
  },
}));