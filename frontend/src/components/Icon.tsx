import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import type { ColorValue } from "react-native";

import { useTheme } from "@/src/theme";

type IconProps = {
  name: string;
  size?: number;
  color?: ColorValue;
};

// Central icon wrapper — MaterialCommunityIcons themed to the palette.
export function Icon({ name, size = 20, color }: IconProps) {
  const { colors } = useTheme();
  return (
    <MaterialCommunityIcons
      name={name as any}
      size={size}
      color={color ?? colors.onSurface}
      allowFontScaling={false}
    />
  );
}