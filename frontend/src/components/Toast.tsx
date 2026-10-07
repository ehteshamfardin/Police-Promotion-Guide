import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "./Icon";
import { fonts, radius, spacing, typeScale, lh, makeStyles, useTheme } from "@/src/theme";

type ToastType = "info" | "success" | "error";
type ToastItem = { id: number; message: string; type: ToastType };

const ToastContext = createContext<{ show: (message: string, type?: ToastType) => void }>({
  show: () => undefined,
});

export function useToast() {
  return useContext(ToastContext);
}

// Global toast viewport — mounted high in the tree so it floats above tabs/modals.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const translateY = useRef(new Animated.Value(-80)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(1);

  const show = useCallback(
    (message: string, type: ToastType = "info") => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setToast({ id: nextId.current++, message, type });
      Animated.sequence([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6 }),
      ]).start();
      hideTimer.current = setTimeout(() => {
        Animated.timing(translateY, { toValue: -80, duration: 220, useNativeDriver: true }).start(() =>
          setToast(null),
        );
      }, 2400);
    },
    [translateY],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toast={toast} translateY={translateY} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toast, translateY }: { toast: ToastItem | null; translateY: Animated.Value }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  if (!toast) return null;

  const iconByType = { info: "information-outline", success: "check-circle-outline", error: "alert-circle-outline" };
  const colorByType = { info: colors.brandSecondary, success: colors.success, error: colors.error };

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.viewport,
        { top: insets.top + spacing.sm, transform: [{ translateY }], zIndex: 9999, elevation: 9999 },
      ]}
    >
      <View style={styles.toast}>
        <Icon name={iconByType[toast.type]} size={20} color={colorByType[toast.type]} />
        <Text style={styles.text}>{toast.message}</Text>
      </View>
    </Animated.View>
  );
}

const useStyles = makeStyles((colors) => ({
  viewport: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceInverse,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
    maxWidth: "86%",
  } as any,
  text: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceInverse,
    flexShrink: 1,
  },
}));