import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card } from "@/src/components/Card";
import { Icon } from "@/src/components/Icon";
import { Header } from "@/src/components/Header";
import { Screen } from "@/src/components/Screen";
import { useToast } from "@/src/components/Toast";
import { logout } from "@/src/lib/auth";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();
  const styles = useStyles();

  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(false);
  const [fontIdx, setFontIdx] = useState(1);
  const FONT_LABELS = ["ছোট", "মাঝারি", "বড়"];

  return (
    <View testID="settings-screen" style={styles.container}>
      <Header title="সেটিংস" />
      <Screen bottomPad={insets.bottom + 24}>
        {/* General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সাধারণ</Text>
          <Card padding={spacing.md}>
            <View style={styles.row}>
              <Icon name="bell-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>নোটিফিকেশন</Text>
              <Switch
                testID="settings-notifications-toggle"
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.surfaceTertiary, true: colors.brandPrimary }}
                thumbColor={colors.onBrandPrimary}
              />
            </View>
            <View style={[styles.row, styles.divider]}>
              <Icon name="volume-high" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>শব্দ ফিডব্যাক</Text>
              <Switch
                testID="settings-sound-toggle"
                value={sound}
                onValueChange={setSound}
                trackColor={{ false: colors.surfaceTertiary, true: colors.brandPrimary }}
                thumbColor={colors.onBrandPrimary}
              />
            </View>
            <View style={[styles.row, styles.divider]}>
              <Icon name="format-font-size-increase" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>ফন্ট সাইজ</Text>
              <View style={styles.fontChips}>
                {FONT_LABELS.map((label, i) => {
                  const selected = i === fontIdx;
                  return (
                    <Pressable
                      key={label}
                      testID={`settings-font-size-${i}`}
                      onPress={() => setFontIdx(i)}
                      style={[styles.fontChip, selected && { backgroundColor: colors.brandPrimary }]}
                    >
                      <Text style={[styles.fontChipText, selected && { color: colors.onBrandPrimary }]}>{label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Card>
        </View>

        {/* Theme & language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>থিম ও ভাষা</Text>
          <Card padding={spacing.md}>
            <View style={styles.row}>
              <Icon name="weather-night" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>থিম</Text>
              <Text style={styles.rowValue}>ডার্ক নেভি</Text>
            </View>
            <View style={[styles.row, styles.divider]}>
              <Icon name="translate" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>ভাষা</Text>
              <Text style={styles.rowValue}>বাংলা</Text>
            </View>
            <View style={[styles.row, styles.divider]}>
              <Icon name="help-circle-outline" size={20} color={colors.brandSecondary} />
              <Text style={styles.rowText}>সহায়তা কেন্দ্র</Text>
              <Icon name="chevron-right" size={20} color={colors.muted} />
            </View>
          </Card>
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>অ্যাকাউন্ট</Text>
          <Card padding={spacing.md}>
            <Pressable
              testID="settings-logout-button"
              style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
              onPress={async () => {
                await logout();
                toast.show("সফলভাবে লগ আউট হয়েছে", "success");
                router.replace("/login");
              }}
            >
              <Icon name="logout" size={20} color={colors.error} />
              <Text style={[styles.rowText, { color: colors.error, fontFamily: fonts.semiBold }]}>লগ আউট</Text>
              <Text style={styles.versionText}>সংস্করণ ১.০.০</Text>
            </Pressable>
          </Card>
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
  section: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  rowText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  rowValue: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  fontChips: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  fontChip: {
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  fontChipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  versionText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.muted,
  },
}));