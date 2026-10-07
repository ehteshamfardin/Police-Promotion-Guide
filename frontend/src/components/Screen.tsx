import { ReactNode } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { makeStyles, useTheme } from "@/src/theme";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  // Extra bottom padding (beyond safe area) for scroll content.
  bottomPad?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  testID?: string;
};

// Root screen container: paints the background edge-to-edge and handles insets.
export function Screen({ children, scroll = true, bottomPad = 24, style, contentStyle, testID }: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  if (!scroll) {
    return (
      <View testID={testID} style={[styles.container, style]}>
        {children}
      </View>
    );
  }

  return (
    <View testID={testID} style={[styles.container, style]}>
      <ScrollView
        contentContainerStyle={[{ paddingBottom: insets.bottom + bottomPad }, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
}));