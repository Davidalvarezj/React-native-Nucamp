import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { ListItem, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { baseUrl } from "../shared/baseUrl";
import LoadingComponent from "../components/LoadingComponent";

const Mission = () => {
  return (
    <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
};

export default function AboutScreen() {
  const partners = useSelector((state) => state.partners);

  if (partners.isLoading) {
    return (
      <ScrollView>
        <Mission />
        <Card>
          <Card.Title>Community Partners</Card.Title>
          <Card.Divider />
          <LoadingComponent />
        </Card>
      </ScrollView>
    );
  }
  if (partners.errMess) {
    return (
      <ScrollView>
        <Animatable.View animation={"fadeInDow"} duration={2000} delay={1000}>
          <Mission />
          <Card>
            <Card.Title>Community Partners</Card.Title>
            <Card.Divider />
            <Text>{partners.errMess}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Animatable.View animation={"fadeInDown"} duration={2000} delay={1000}>
        <Mission />
        <Card>
          <Card.Title>Community Partners</Card.Title>
          <Card.Divider />
          {partners.partnersArray.map((elm) => {
            return (
              <ListItem key={elm.id}>
                <Avatar source={{ uri: baseUrl + elm.image }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{elm.name}</ListItem.Title>
                  <ListItem.Subtitle>{elm.description}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </Card>
      </Animatable.View>
    </ScrollView>
  );
}
