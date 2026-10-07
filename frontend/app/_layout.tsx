import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { LogBox, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { ErrorBoundary } from "@/src/components/error-boundary";
import { ToastProvider } from "@/src/components/Toast";
import { AuthProvider, useAuth } from "@/src/providers/AuthProvider";
import { queryClient } from "@/src/query-client";
import { themes } from "@/src/theme";

// Disable logbox errors etc so that users can see the app
// and agent works as expected.
LogBox.ignoreAllLogs(true);

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSansBengali-Regular": require("../assets/fonts/bengali/NotoSansBengali-Regular.ttf"),
    "NotoSansBengali-Medium": require("../assets/fonts/bengali/NotoSansBengali-Medium.ttf"),
    "NotoSansBengali-SemiBold": require("../assets/fonts/bengali/NotoSansBengali-SemiBold.ttf"),
    "NotoSansBengali-Bold": require("../assets/fonts/bengali/NotoSansBengali-Bold.ttf"),
    MaterialDesignIcons: require("@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <AuthProvider>
            <ToastProvider>
              <StatusBar style="light" />
              <RootNavigator />
            </ToastProvider>
          </AuthProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Public routes (reachable while signed out). Everything else requires a session.
const PUBLIC_SEGMENTS = new Set(["login", "register", "forgot-password", "reset-password", "onboarding"]);

function RootNavigator() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const seg0 = segments[0] as string | undefined;
    if (seg0 === undefined) return; // index (splash) handles its own routing
    const isPublic = PUBLIC_SEGMENTS.has(seg0);
    if (!session && !isPublic) {
      router.replace("/login");
    } else if (session && (seg0 === "login" || seg0 === "register" || seg0 === "onboarding")) {
      router.replace("/home");
    }
  }, [session, loading, segments, router]);

  return (
    <View style={{ flex: 1, backgroundColor: themes.light.surface }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: themes.light.surface },
        }}
      >
        <Stack.Screen name="mock-test" options={{ animation: "fade", gestureEnabled: false }} />
      </Stack>
    </View>
  );
}