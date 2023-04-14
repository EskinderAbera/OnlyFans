import { Text, StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import posts from "../../assets/data/posts";
import Post from "../../src/components/Post";
import { FontAwesome5 } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { User } from "../../src/models";

const ProfilePage = () => {
  const [user, setUser] = useState();

  const { id } = useSearchParams();

  const [isSubscribed, setIsSubcribed] = React.useState(false);

  // const user = users.find((u) => u.id === id);

  useEffect(() => {
    DataStore.query(User, id).then(setUser);
  }, [id]);

  if (!user) {
    return <Text>User not found</Text>;
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubcribed={setIsSubcribed}
        />
        <View
          style={{
            backgroundColor: "gainsboro",
            alignItems: "center",
            padding: 20,
          }}
        >
          <FontAwesome5
            name="lock"
            size={50}
            color="gray"
            style={{ marginRight: 15 }}
          />
          <Text
            style={{
              backgroundColor: "royalblue",
              padding: 15,
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
              color: "white",
              margin: 20,
            }}
          >
            Subscribe to see user's posts
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={() => (
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubcribed={setIsSubcribed}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProfilePage;
