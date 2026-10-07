import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { Modal } from "@/src/components/Modal";
import { useToast } from "@/src/components/Toast";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

const RANKS = ["কনস্টেবল", "নায়েক", "হাভিলদার", "উপ-পরিদর্শক (এসআই)", "সার্জেন্ট", "ইন্সপেক্টর"];

export default function Register() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();

  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [rank, setRank] = useState<string | null>(null);
  const [station, setStation] = useState("");
  const [password, setPassword] = useState("");
  const [rankModal, setRankModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!name.trim() || !serviceId.trim() || !rank || !password.trim()) {
      toast.show("সবগুলো ঘর পূরণ করুন", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.show(`স্বাগতম, ${name}! অ্যাকাউন্ট তৈরি হয়েছে`, "success");
      router.replace("/home");
    }, 800);
  };

  return (
    <View testID="register-screen" style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        bottomOffset={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={[colors.brandPrimary, colors.goldDeep]} style={styles.logo}>
          <Text style={styles.logoText}>★</Text>
        </LinearGradient>

        <Text style={styles.title}>নিবন্ধন করুন</Text>
        <Text style={styles.subtitle}>অফিসার প্রোফাইল তৈরি করুন</Text>

        <View style={styles.form}>
          <Input
            label="পূর্ণ নাম"
            icon="account-outline"
            placeholder="আপনার নাম"
            value={name}
            onChangeText={setName}
            testID="register-name-input"
          />
          <Input
            label="সার্ভিস আইডি"
            icon="badge-account-outline"
            placeholder="যেমন: SI-4782"
            value={serviceId}
            onChangeText={setServiceId}
            testID="register-service-id-input"
            autoCapitalize="none"
          />
          <Pressable testID="register-rank-select" onPress={() => setRankModal(true)} style={styles.selectField}>
            <Text style={styles.selectLabel}>পদবি</Text>
            <View style={[styles.selectValue, { borderColor: colors.border }]}>
              <Icon name="shield-outline" size={20} color={colors.muted} />
              <Text style={[styles.selectText, !rank && { color: colors.muted }]}>{rank ?? "পদবি নির্বাচন করুন"}</Text>
              <Icon name="chevron-down" size={22} color={colors.muted} />
            </View>
          </Pressable>
          <Input
            label="ইউনিট / থানা"
            icon="office-building-outline"
            placeholder="যেমন: তেজগাঁও থানা, ডিএমপি"
            value={station}
            onChangeText={setStation}
            testID="register-station-input"
          />
          <Input
            label="পাসওয়ার্ড"
            icon="lock-outline"
            placeholder="কমপক্ষে ৬ অক্ষর"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="register-password-input"
          />
        </View>

        <Button title="অ্যাকাউন্ট তৈরি করুন" size="lg" loading={loading} onPress={submit} testID="register-submit-button" />

        <Pressable testID="register-login-link" onPress={() => router.back()} style={styles.loginRow}>
          <Text style={styles.loginText}>
            অ্যাকাউন্ট আছে? <Text style={styles.loginLink}>লগ ইন করুন</Text>
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>

      <Modal visible={rankModal} onClose={() => setRankModal(false)} title="পদবি নির্বাচন করুন" testID="register-rank-modal">
        {RANKS.map((r) => (
          <Pressable
            key={r}
            testID={`register-rank-option-${r}`}
            onPress={() => {
              setRank(r);
              setRankModal(false);
            }}
            style={({ pressed }) => [styles.rankRow, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.rankText}>{r}</Text>
            {rank === r ? <Icon name="check" size={20} color={colors.brandPrimary} /> : null}
          </Pressable>
        ))}
      </Modal>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xl,
    alignItems: "center",
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 28,
    color: colors.onBrandPrimary,
    fontFamily: fonts.bold,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.xxl,
    lineHeight: lh(typeScale.xxl),
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
    marginTop: spacing.xs,
  },
  form: {
    alignSelf: "stretch",
    gap: spacing.lg,
    marginVertical: spacing.xl,
  },
  selectField: {
    alignSelf: "stretch",
    gap: spacing.sm,
  },
  selectLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.onSurfaceTertiary,
  },
  selectValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceTertiary,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  selectText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  loginRow: {
    marginTop: spacing.xl,
    padding: spacing.sm,
  },
  loginText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  loginLink: {
    fontFamily: fonts.semiBold,
    color: colors.brandPrimary,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    minHeight: 48,
  },
  rankText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
}));