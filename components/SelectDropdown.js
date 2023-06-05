import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";

export default function SelectDropdown(props) {
  return (
    <View style={styles.dropdown}>
      <RNPickerSelect
        onValueChange={(value) => props.setFilterVal(value)}
        items={[
            { label: 'No Status', value: 'No Status' },
            { label: 'InProgress', value: 'InProgress' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Complete', value: 'Complete' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
    borderColor: "grey",
    marginHorizontal: 10,
  },
});
