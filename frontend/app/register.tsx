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
import { BP_RANKS } from "@/src/data/ranks";
import { isEmail, signUpWithProfile } from "@/src/lib/auth";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

type RankField = "current" | "target";

export default function Register() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toast = useToast();
  const styles = useStyles();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentRank, setCurrentRank] = useState<string | null>(null);
  const [targetRank, setTargetRank] = useState<string | null>(null);
  const [unit, setUnit] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rankModal, setRankModal] = useState<RankField | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName.trim()) return "আপনার নাম দিন";
    if (!phone.trim()) return "মোবাইল নম্বর দিন";
    if (!isEmail(email)) return "সঠিক ইমেইল ঠিকানা দিন";
    if (!currentRank) return "বর্তমান পদ নির্বাচন করুন";
    if (!targetRank) return "কাঙ্ক্ষিত পদ নির্বাচন করুন";
    if (password.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    if (password !== confirm) return "পাসওয়ার্ড দুটি মিলছে না";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) {
      toast.show(err, "error");
      return;
    }
    setLoading(true);
    const { data, error } = await signUpWithProfile({
      email,
      password,
      full_name: fullName.trim(),
      phone: phone.trim(),
      current_rank: currentRank,
      target_rank: targetRank,
      unit: unit.trim(),
      joining_year: joiningYear ? parseInt(joiningYear, 10) : null,
    });
    setLoading(false);

    if (error) {
      toast.show(/registered|already/i.test(error.message) ? "এই ইমেইল আগেই নিবন্ধিত" : "নিবন্ধন ব্যর্থ হয়েছে", "error");
      return;
    }
    // Session present => email confirmation is OFF => straight to Home.
    // No session => confirmation email required.
    if (data.session) {
      toast.show(`স্বাগতম, ${fullName}! অ্যাকাউন্ট তৈরি হয়েছে`, "success");
      router.replace("/home");
    } else {
      toast.show("নিবন্ধন সফল! ইমেইল যাচাই করে লগ ইন করুন", "success");
      router.replace("/login");
    }
  };

  const pickRank = (value: string) => {
    if (rankModal === "current") setCurrentRank(value);
    else if (rankModal === "target") setTargetRank(value);
    setRankModal(null);
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
          <Input label="নাম" icon="account-outline" placeholder="আপনার পূর্ণ নাম" value={fullName} onChangeText={setFullName} testID="register-name-input" />
          <Input label="মোবাইল নম্বর" icon="phone-outline" placeholder="01XXXXXXXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" testID="register-phone-input" />
          <Input label="ইমেইল" icon="email-outline" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" testID="register-email-input" />

          <Pressable testID="register-current-rank-select" onPress={() => setRankModal("current")} style={styles.selectField}>
            <Text style={styles.selectLabel}>বর্তমান পদ</Text>
            <View style={[styles.selectValue, { borderColor: colors.border }]}>
              <Icon name="shield-outline" size={20} color={colors.muted} />
              <Text style={[styles.selectText, !currentRank && { color: colors.muted }]}>{currentRank ?? "পদ নির্বাচন করুন"}</Text>
              <Icon name="chevron-down" size={22} color={colors.muted} />
            </View>
          </Pressable>

          <Pressable testID="register-target-rank-select" onPress={() => setRankModal("target")} style={styles.selectField}>
            <Text style={styles.selectLabel}>কাঙ্ক্ষিত পদ</Text>
            <View style={[styles.selectValue, { borderColor: colors.border }]}>
              <Icon name="shield-star-outline" size={20} color={colors.muted} />
              <Text style={[styles.selectText, !targetRank && { color: colors.muted }]}>{targetRank ?? "পদ নির্বাচন করুন"}</Text>
              <Icon name="chevron-down" size={22} color={colors.muted} />
            </View>
          </Pressable>

          <Input label="ইউনিট / থানা" icon="office-building-outline" placeholder="যেমন: তেজগাঁও থানা, ডিএমপি" value={unit} onChangeText={setUnit} testID="register-unit-input" />
          <Input label="যোগদানের বছর" icon="calendar-outline" placeholder="যেমন: ২০১৫" value={joiningYear} onChangeText={setJoiningYear} keyboardType="number-pad" testID="register-joining-year-input" />
          <Input label="পাসওয়ার্ড" icon="lock-outline" placeholder="কমপক্ষে ৬ অক্ষর" value={password} onChangeText={setPassword} secureTextEntry testID="register-password-input" />
          <Input label="পাসওয়ার্ড নিশ্চিত করুন" icon="lock-check-outline" placeholder="আবার লিখুন" value={confirm} onChangeText={setConfirm} secureTextEntry testID="register-confirm-input" />
        </View>

        <Button title="অ্যাকাউন্ট তৈরি করুন" size="lg" loading={loading} onPress={submit} testID="register-submit-button" />

        <Pressable testID="register-login-link" onPress={() => router.replace("/login")} style={styles.loginRow}>
          <Text style={styles.loginText}>
            অ্যাকাউন্ট আছে? <Text style={styles.loginLink}>লগ ইন করুন</Text>
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>

      <Modal
        visible={rankModal !== null}
        onClose={() => setRankModal(null)}
        title={rankModal === "target" ? "কাঙ্ক্ষিত পদ" : "বর্তমান পদ"}
        testID="register-rank-modal"
      >
        {BP_RANKS.map((r) => {
          const active = (rankModal === "current" ? currentRank : targetRank) === r;
          return (
            <Pressable
              key={r}
              testID={`register-rank-option-${r}`}
              onPress={() => pickRank(r)}
              style={({ pressed }) => [styles.rankRow, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.rankText}>{r}</Text>
              {active ? <Icon name="check" size={20} color={colors.brandPrimary} /> : null}
            </Pressable>
          );
        })}
      </Modal>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.surface },
  content: { paddingHorizontal: spacing.xl, alignItems: "center" },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoText: { fontSize: 28, color: colors.onBrandPrimary, fontFamily: fonts.bold },
  title: { fontFamily: fonts.bold, fontSize: typeScale.xxl, lineHeight: lh(typeScale.xxl), color: colors.onSurface },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.muted,
    marginTop: spacing.xs,
  },
  form: { alignSelf: "stretch", gap: spacing.lg, marginVertical: spacing.xl },
  selectField: { alignSelf: "stretch", gap: spacing.sm },
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
  loginRow: { marginTop: spacing.xl, padding: spacing.sm },
  loginText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.sm,
    lineHeight: lh(typeScale.sm),
    color: colors.muted,
  },
  loginLink: { fontFamily: fonts.semiBold, color: colors.brandPrimary },
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