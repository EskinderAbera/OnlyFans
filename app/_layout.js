import { Stack } from "expo-router";
import { API, Amplify, DataStore, Hub, graphqlOperation } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { useEffect } from "react";
import { User } from "../src/models";

Amplify.configure(awsconfig);

const CreateUserMutation = `
mutation createUser($input: CreateUserInput!){
	createUser(input: $input){
    id
    name
    handle
    bio
    subscriptionPrice
  }
}`;

export default function RootLayout() {
  useEffect(() => {
    const removeListener = Hub.listen("auth", async (data) => {
      if (data.payload.event === "signIn") {
        const userInfo = data.payload.data.attributes;
        // DataStore.save(new User({ id: userInfo.sub, name: userInfo.name }));

        const newUser = {
          id: userInfo.sub,
          name: userInfo.name,
          handle: userInfo.nickname,
          subscriptionPrice: 0,
          bio: "In Informatics, dummy data is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present.",
        };

        await API.graphql({
          query: CreateUserMutation,
          variables: { input: newUser },
        });
      }
    });

    return () => {
      removeListener();
    };
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
}
