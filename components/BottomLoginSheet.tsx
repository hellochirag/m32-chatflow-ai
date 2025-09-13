import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useWarmUpBrowser();

const onGoogleSignInPress = useCallback(async () => {
  try {
    const { createdSessionId, setActive } = await startOAuthFlow({
      redirectUrl: AuthSession.makeRedirectUri({ useProxy: true }),
    });
    console.log("Created Session ID:", createdSessionId);
    console.log("Set Active Function:", setActive);
    if (createdSessionId) {
      await setActive!({ session: createdSessionId });
    } else {
      Alert.alert("Google Sign-In incomplete. Please try again.");
    }
  } catch (error) {
    console.log("Error", error);
  }
}, []);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity
        onPress={() => onGoogleSignInPress()}
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color={"#fff"}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/login",
          params: { type: "register" },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild
      >
        <TouchableOpacity>
          <Ionicons
            name="mail"
            size={20}
            style={styles.btnIcon}
            color={"#fff"}
          />
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: "/login",
          params: { type: "login" },
        }}
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: "#fff",
  },
  btnLightText: {
    color: "#000",
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;
