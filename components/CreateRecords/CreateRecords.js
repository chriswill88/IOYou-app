import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const date = new Date()

export default function CreateRecords({setApp}) {
  const [name, setName] = React.useState("");
  const [things, setThings] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [ready, setReady] = React.useState(false)

  const [youOwe, setyouOwe] = useState(true);
  const payload = {
    youOwe: youOwe,
    name: name,
    thing: things,
    reason: reason,
    startDate: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    endDate: null,
    paid: false
  }

  let pl = null



  return (
    <View>
      <Text style={styles.title}>Create A New Record</Text>
      <Picker
        selectedValue={youOwe}
        style={{ width: 300 }}
        onValueChange={(itemValue, itemIndex) => setyouOwe(itemValue)}
      >
        <Picker.Item label="I owe Someone" value={true} />
        <Picker.Item label="Someone owes Me" value={false} />
      </Picker>
  
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder={ready ? "Name of the person you owe/owes you." : 'Please enter a name!'}
      />
  
      <TextInput
        style={styles.input}
        onChangeText={setThings}
        value={things}
        placeholder={ready ? "What is owed?" : 'Please enter the item that is owed!'}
      />

      <TextInput
        style={styles.input}
        onChangeText={setReason}
        value={reason}
        placeholder={ready ? "What is the Reason?" : 'Please enter a reason!'}
      />

      <Button 
        title={'Save'}
        onPress={() => {
          if (name && things && reason) {
            setReady(true)
            setApp('View');
            pl = JSON.stringify(payload);
          } else {
            setReady(false);
            console.log('Not all forms are filled');
          }
        }}
      />

      <Button
      title={'Share & Save'}
      onPress={async () => {
        if (name && things && reason) {
          pl = JSON.stringify(payload);
          setReady(true)

          await Share.share({
            message: 'Hey, this was sent from the app,\n' + pl
          });
          setApp('View');
        } else {
          setReady(false);
          console.log('Not all forms are filled');
        }
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});