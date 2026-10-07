import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/src/components/Icon";
import { Input } from "@/src/components/Input";
import { AI_FAKE_REPLY, AI_SUGGESTED_PROMPTS } from "@/src/data/demo";
import { fonts, lh, makeStyles, radius, spacing, typeScale, useTheme } from "@/src/theme";

type Message = { role: "bot" | "user"; text: string };

export default function AiAssistant() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "আসসালামু আলাইকুম! আমি আপনার এআই স্টাডি সহকারী। পুলিশ রেগুলেশন বা আইন নিয়ে যেকোনো প্রশ্ন করুন (ডেমো প্রিভিউ)।",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<ScrollView>(null);

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages, thinking]);

  const send = (text: string) => {
    const msg = text.trim();
    if (!msg || thinking) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: AI_FAKE_REPLY }]);
      setThinking(false);
    }, 1000);
  };

  return (
    <View testID="ai-assistant-screen" style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.botAvatar}>
          <Icon name="robot-outline" size={22} color={colors.onBrandPrimary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>এআই স্টাডি সহকারী</Text>
          <Text style={styles.headerSub}>ডেমো প্রিভিউ · সবসময় চালু</Text>
        </View>
        <View style={styles.onlineDot} />
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior="translate-with-padding">
        <ScrollView
          ref={listRef}
          contentContainerStyle={[styles.messages, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              testID={`ai-message-${i}`}
              style={[styles.bubble, m.role === "user" ? styles.bubbleUser : styles.bubbleBot]}
            >
              <Text style={[styles.bubbleText, m.role === "user" && { color: colors.onInfo }]}>{m.text}</Text>
            </View>
          ))}
          {thinking ? (
            <View style={[styles.bubble, styles.bubbleBot]} testID="ai-thinking-indicator">
              <Text style={styles.bubbleText}>টাইপ করছে...</Text>
            </View>
          ) : null}

          <View style={styles.suggestions}>
            {AI_SUGGESTED_PROMPTS.map((p) => (
              <Pressable
                key={p}
                testID={`ai-suggested-prompt-${p}`}
                onPress={() => send(p)}
                style={styles.suggestionChip}
              >
                <Text style={styles.suggestionText}>{p}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing.md }]}>
          <Input
            placeholder="আপনার প্রশ্ন লিখুন..."
            value={input}
            onChangeText={setInput}
            testID="ai-assistant-input"
            style={styles.input}
          />
          <Pressable
            testID="ai-assistant-send-button"
            onPress={() => send(input)}
            style={[styles.sendBtn, { opacity: input.trim() ? 1 : 0.5 }]}
          >
            <Icon name="send" size={20} color={colors.onBrandPrimary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  botAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.lg,
    lineHeight: lh(typeScale.lg),
    color: colors.onSurface,
  },
  headerSub: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.success,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  messages: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingTop: spacing.xl,
  },
  bubble: {
    maxWidth: "82%",
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  bubbleBot: {
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: radius.sm,
  },
  bubbleUser: {
    alignSelf: "flex-end",
    backgroundColor: colors.brandSecondary,
    borderTopRightRadius: radius.sm,
  },
  bubbleText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.base,
    lineHeight: lh(typeScale.base),
    color: colors.onSurface,
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  suggestionChip: {
    flexShrink: 0,
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.xs,
    lineHeight: lh(typeScale.xs),
    color: colors.onSurfaceTertiary,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
  },
  sendBtn: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
}));