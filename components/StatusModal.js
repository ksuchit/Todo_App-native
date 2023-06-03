import { Text, View } from "react-native";
import { Button } from "./Button";
import { Modal } from "./Modal";
import RadioButton from "./RadioButton";
import { Icon } from "@rneui/themed";

export default function StatusModal({ show, setShow, status, setStatus }) {
  return (
    <Modal isVisible={show}>
      <Modal.Container>
        <View style={{display:"flex",justifyContent:'space-between',flexDirection:"row",marginRight:15,marginTop:10}}>
        <View style={{marginLeft:20}}><Text style={{fontSize:20,fontWeight:500}}>Change Status</Text></View>
          <Icon name="close" color="red" onPress={()=> setShow(false)} />
        </View>
        {/* <Modal.Header /> */}
        <Modal.Body>
          <RadioButton status={status} setStatus={setStatus} />
        </Modal.Body>
        <Modal.Footer>
          <Button title="CHANGE" onPress={() => setShow(false)} />
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
}
