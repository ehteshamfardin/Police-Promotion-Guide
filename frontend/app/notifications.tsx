import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EmptyState } from "@/src/components/EmptyState";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { useToast } from "@/src/components/Toast";
import { NOTIFICATIONS } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const TYPE_COLORS: Record<string, string> = {
  exam: "info",
  test: "success",
  note: "warning",
  system: "brandPrimary",
};

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();
  const styles = useStyles();

  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter((n) => n.unread).length;

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.show("সব নোটিফিকেশন পড়া হয়েছে", "success");
  };

  return (
    <View testID="notifications-screen" style={styles.container}>
      <Header
        title="নোটিফিকেশন"
        subtitle={unread > 0 ? `${unread}টি অপঠিত` : "সব পড়া হয়েছে"}
        right={
          unread > 0 ? (
            <Pressable testID="notifications-mark-all-button" onPress={markAll} style={styles.markAllBtn}>
              <Text style={styles.markAllText}>সব পড়া হয়েছে</Text>
            </Pressable>
          ) : null
        }
      />
      {items.length === 0 ? (
        <EmptyState icon="bell-off-outline" title="কোনো নোটিফিকেশন নেই" testID="notifications-empty-state" />
      ) : (
        <Screen bottomPad={insets.bottom + 24}>
          <View style={styles.list}>
            {items.map((n) => {
              const tint = (colors as Record<string, string>)[TYPE_COLORS[n.type]] ?? colors.brandSecondary;
              return (
                <Pressable
                  key={n.id}
                  testID={`notification-card-${n.id}`}
                  onPress={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                  style={({ pressed }) => [
                    styles.card,
                    { backgroundColor: n.unread ? colors.surfaceSecondary : colors.surface },
                    n.unread && { borderColor: "rgba(212, 175, 55, 0.35)" },
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <View style={[styles.iconWrap, { backgroundColor: `${tint}1F` }]}>
                    <Icon name={n.icon} size={22} color={tint} />
                  </View>
                  <View style={styles.textWrap}>
                    <View style={styles.titleRow}>
                      <Text style={styles.title} numberOfLines={1}>
                        {n.title}
                      </Text>
                      {n.unread ? <View style={styles.unreadDot} /> : null}
                    </View>
                    <Text style={styles.body} numberOfLines={2}>
                      {n.body}
                    </Text>
                    <Text style={styles.time}>{n.time}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Screen>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  markAllBtn: {
    padding: spacing.sm,
  },
  markAllText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.brandSecondary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.semiBold,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurface,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandPrimary,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
    marginTop: 2,
  },
}));