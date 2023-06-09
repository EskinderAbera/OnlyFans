import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";

export default function UserCard({ user }) {
  return (
    <Link asChild href={`/user/${user.id}`}>
      <Pressable>
        <ImageBackground
          source={{ uri: user.coverImage }}
          style={styles.userCard}
        >
          <View style={styles.overlay} />
          <Image src={user.avatar} style={styles.userImage} />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>{`@${user.handle}`}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "gray",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    ...StyleSheet.absoluteFillObject,
  },
});
