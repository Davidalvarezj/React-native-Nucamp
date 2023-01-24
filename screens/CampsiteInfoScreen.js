import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { Rating, Input, Icon } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toogleFavorite } from "../features/favorites/favoritesSlice";
import { postComment } from "../features/comments/commentsSlice";
import * as Animatable from "react-native-animatable";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);
  const favorite = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  console.log("favoriteArray:", favorite);
  console.log("commentArray:", comments);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  console.log("rating: ", rating);
  console.log("author: ", author);
  console.log("text: ", text);

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id,
    };
    setShowModal(!showModal);
    console.log("newComment Obj: ", newComment);
    dispatch(postComment(newComment));
  };
  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={10}
          readonly
          style={{
            paddingVertical: 10,
            alignItems: "flex-start",
            paddingVertical: "5%",
          }}
        />

        <Text
          style={{ fontSize: 12 }}
        >{`--${item.author}, ${item.date},`}</Text>
      </View>
    );
  };

  return (
    <Animatable.View animation={"fadeInUp"} duration={2000} delay={1000}>
      <FlatList
        data={comments.commentsArray.filter(
          (elm) => elm.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorite.includes(campsite.id)}
              markFavorite={() => dispatch(toogleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            startingValue={rating}
            imageSize={40}
            showRating
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            onChangeText={(data) => setAuthor(data)}
            value={author}
            leftIcon={
              <Icon
                name={"user-o"}
                type="font-awesome"
                color="#5637DD"
                size={25}
              />
            }
            leftIconContainerStyle={{ paddingRight: 10 }}
          />
          <Input
            placeholder="Comment"
            onChangeText={(data) => setText(data)}
            value={text}
            leftIcon={
              <Icon
                name={"comment-o"}
                type="font-awesome"
                color="#5637DD"
                size={25}
              />
            }
            leftIconContainerStyle={{ paddingRight: 10 }}
          />
          <View style={{ margin: 10 }}>
            <Button
              color="#5637DD"
              title="Submit"
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              color="#808080"
              title="Cancel"
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
            />
          </View>
        </View>
      </Modal>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeigh: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
