import { Platform } from "react-native";

// iOS 26+ renders native Liquid Glass tab bars; everything else uses the
// classic JS tab bar from expo-router.
export const usesNativeTabs =
  Platform.OS === "ios" && parseInt(String(Platform.Version), 10) >= 26;