import { Text, View } from "react-native";
import { Button } from "./Button";
import { Modal } from "./Modal";
import RadioButton from "./RadioButton";
import { Icon } from "@rneui/themed";

export default function StatusModal({ show, setShow, status, setStatus }) {
  return (
    <Modal isVisible={show}>
      <Modal.Container>
        <View style={{display:"flex",alignItems:'flex-end',marginRight:10,marginTop:10}}>
          <Icon name="close" color="red" onPress={()=> setShow(false)} />
        </View>
        <Modal.Header title="Set Task-Status" />
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
