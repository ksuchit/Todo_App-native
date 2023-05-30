import { useState } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { Text, View } from 'react-native';

export default function RadioButton({setStatus}) {
  const options = [
    { label: 'No Status', value: 'No Status' },
    { label: 'InProgress', value: 'InProgress' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Complete', value: 'Complete' },
  ]; //create our options for radio group
  return (
    <View style={{marginTop:20}}>
      <RadioForm
        radio_props={options}
        initial={0} //initial value of this group
        onPress={(value) => {
          setStatus(value);
        }} //if the user changes options, set the new value
      />
    </View>
  );
}