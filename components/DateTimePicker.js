import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const DateTimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
      console.warn("A Time has been picked: ", time);
      selectedTime(time)
    hideTimePicker();
  };

  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
      <AntDesign name="calendar" size={25} onPress={showDatePicker} />
      <MaterialCommunityIcons
        name="clock-time-four-outline"
        size={25}
        onPress={showTimePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        date={selectedDate}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        onChange={(date)=>console.log(date)}      
      />
    </View>
  );
};
// { display: "flex", flexDirection: "row", gap: 20 }
const styles = StyleSheet.create({
  addTaskBtn: {
    backgroundColor: "#dadae3", //#dadae3
    padding: 10,
    borderRadius: 10,
    // width: 50,
  },
});
export default DateTimePicker;
