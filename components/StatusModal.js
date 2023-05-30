import { Text } from "react-native";
import { Button } from "./Button";
import { Modal } from "./Modal";
import RadioButton from "./RadioButton";

export default function StatusModal({show,setShow,setStatus}) {
  return (
    <Modal isVisible={show}>
      <Modal.Container>
        <Modal.Header title="Set Task-Status" />
        <Modal.Body>
          <RadioButton setStatus={setStatus} />
        </Modal.Body>
        <Modal.Footer>
          <Button title="Save"  onPress={()=>setShow(false)}/>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
}
