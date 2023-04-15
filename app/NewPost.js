import { View, Text, TextInput, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { DataStore } from "aws-amplify";
import { Post } from "../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const NewPost = () => {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");

  const { user } = useAuthenticator();

  const router = useRouter();

  const onPost = async () => {
    await DataStore.save(
      new Post({ text, likes: 0, userID: user.attributes.sub })
    );
    setText("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          onPress={() => router.back()}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: "500", fontSize: 20 }}>New Post</Text>
      </View>
      <TextInput
        placeholder="compose new post"
        value={text}
        onChangeText={setText}
        numberOfLines={3}
        multiline
      />
      <View style={{ marginVertical: 15 }}>
        <Feather onPress={pickImage} name="image" size={24} color="black" />
      </View>
      {image && <Image src={image} style={{ width: "100%", aspectRatio: 1 }} />}
      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default NewPost;
