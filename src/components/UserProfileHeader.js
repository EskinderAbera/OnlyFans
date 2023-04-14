import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const UserProfileHeader = ({ user, setIsSubcribed, isSubscribed }) => {
  const router = useRouter();

  return (
    <View>
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />
        <SafeAreaView
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="white"
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>
              1.4K Posts • 64.3K Likes • 15.3K Fans
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: -50,
          }}
        >
          <Image src={user.avatar} style={styles.userImage} />
          <FontAwesome name="share-square-o" size={24} color="royalblue" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 5 }}>
          {user.name}
        </Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>@{user.handle}</Text>
        <Text style={{ lineHeight: 20 }} numberOfLines={5}>
          {user.bio}
        </Text>
        <Text style={{ color: "gray", marginTop: 20, fontWeight: "bold" }}>
          SUBSCRIPTION
        </Text>
        <Pressable
          style={styles.button(isSubscribed)}
          onPress={() => setIsSubcribed(!isSubscribed)}
        >
          <Text style={styles.buttonText(isSubscribed)}>
            {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Text>
          <Text style={styles.buttonText(isSubscribed)}>
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice.toFixed(2)}/month`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  button: (isSubscribed) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: isSubscribed ? "white" : "royalblue",
  }),
  buttonText: (isSubscribed) => ({
    fontWeight: "600",
    color: isSubscribed ? "royalblue" : "white",
  }),
});

export default UserProfileHeader;
