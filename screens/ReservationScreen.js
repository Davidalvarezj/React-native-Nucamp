import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Platform,
  Modal,
  Alert,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

export default function ReservationScreen() {
  const [campers, setCampers] = useState(1);
  const [hikeIn, setHikeIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleReservation = () => {
    console.log(campers, hikeIn, date, showCalendar);
    // setShowModal(!showModal);

    const messege = `Number of campers: ${campers} \n
Hike-In ? : ${hikeIn}  \n
Date : ${date.toLocaleDateString("en-US")} \n`;

    Alert.alert(
      "Begin Search?",
      messege,
      [
        {
          text: "cancel",
          onPress: () => {
            console.log("Alert presed CANCEL..");
            resetForm();
          },
          style: "cancel",
        },
        {
          text: "ok",
          // onPress: () => dispatch(toogleFavorite(campsite.id)),
          onPress: () => {
            console.log("Aletr pressed OK...");
            presentLocalNotification(date.toLocaleDateString("en-US"));
            resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const resetForm = () => {
    setCampers(1);
    setHikeIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  const presentLocalNotification = async (reservationDate) => {
    const sendNotification = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Campsite Reservation Search",
          body: "Search for " + reservationDate + " requested",
        },
        trigger: null,
      });
    };
    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    }
  };

  return (
    <ScrollView>
      <Animatable.View animation={"zoomIn"} duration={2000} delay={1000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Campers:</Text>
          <Picker
            style={styles.formItem}
            selectedValue={campers}
            onValueChange={(itemValue) => setCampers(itemValue)}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text>Hike In?</Text>
          <Switch
            style={styles.formItem}
            value={hikeIn}
            trackColor={{ true: "#5637DD", false: null }}
            onValueChange={(Value) => setHikeIn(Value)}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date:</Text>
          <Button
            onPress={() => setShowCalendar(!showCalendar)}
            title={date.toLocaleDateString("en-US")}
            color="#5637DD"
            accessibilityLabel="Tab me to select date"
          />
        </View>
        {showCalendar && (
          <DateTimePicker
            style={styles.formItem}
            value={date}
            mode="default"
            onChange={onDateChange}
          />
        )}
        <View>
          <Button
            onPress={() => handleReservation()}
            title="Search Availability"
            color="#5637DD"
            accessibilityLabel="Tap me to search"
          />
        </View>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={() => setShowModal(!showModal)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Search Campsite Reservations </Text>
            <Text style={styles.modalText}>Number of Campers: {campers} </Text>
            <Text style={styles.modalText}>
              Hike-In?: {hikeIn ? "Yes" : "No"}
            </Text>
            <Text style={styles.modalText}>
              Date: {date.toLocaleDateString("en-US")}
            </Text>
            <Button
              color="#5637DD"
              title="Closed"
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
            />
          </View>
        </Modal> */}
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});
