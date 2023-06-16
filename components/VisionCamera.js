import { useCameraDevices } from "react-native-vision-camera"

export default function VisionCamera() {
    const devices = useCameraDevices()
    const device = devices.back
  
    return (
      <Camera
        // style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    )
  }