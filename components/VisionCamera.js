import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Icon, Image } from "@rneui/base";
export default VisionCamera = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [rotate, setRotate] = useState(false);
  // const device = rotate ? devices.front : devices.back;

  console.log("vision camera called")
  async function getPermission() {
    // try {
    //   const permission = await Camera.requestCameraPermission();
    //   console.log(`Camera perdission status: ${permission}`);
    //   setShowCamera(true)
    //   if (permission === 'denied') await Linking.openSettings();
    // }catch(e){console.log(e)}

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        setShowCamera(true);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPermission();
  }, []);

  const capturePhoto = async () => {
    console.log(camera.null);
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };
  // if (device == null)
  //   return (
  //     <View>
  //       <Text>Loading.........</Text>
  //     </View>
  //   );

  return (
    <>
      {showCamera ? (
        <View style={CameraStyles.container}>
          <Camera
            photo={true}
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
          />

          <TouchableOpacity style={CameraStyles.capture} onPress={capturePhoto}>
            <View style={CameraStyles.fillCapture}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={CameraStyles.cameraRotator}
            onPress={() => setRotate((prev) => !prev)}
          >
            <Icon name="refresh" type="evilicon" size={60} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Image
            source={{ uri: "file://" + imageSource }}
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          />
          <TouchableOpacity
            style={{
              ...CameraStyles.tickMark,
              position: "absolute",
              top: 600,
              bottom: 0,
            }}
            onPress={() => {
              setShowCamera(true);
              setImageSource("");
            }}
          >
            <Icon name="done" type="metrialicons" size={70} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...CameraStyles.cancelImage,
              position: "absolute",
              top: 600,
              bottom: 0,
            }}
            onPress={() => {
              setShowCamera(true);
              setImageSource("");
            }}
          >
            <Icon name="cancel" type="metrialicons" size={70} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const CameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 100,
    width: 50,
  },
  capture: {
    top: 600,
    height: 80,
    width: 80,
    flex: 0,
    borderWidth: 1,
    padding: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 50,
    alignSelf: "center",
    margin: 20,
  },
  tickMark: {
    top: 600,
    right: 10,
    height: 80,
    width: 80,
    flex: 0,
    borderWidth: 1,
    padding: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 50,
    alignSelf: "flex-end",
    margin: 20,
  },
  cameraRotator: {
    top: 483,
    right: 130,
    height: 70,
    width: 70,
    flex: 0,
    borderWidth: 1,
    padding: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 50,
    alignSelf: "center",
    margin: 20,
  },
  cancelImage: {
    top: 600,
    height: 80,
    width: 80,
    flex: 0,
    borderWidth: 1,
    padding: 4,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 50,
    alignSelf: "flex-start",
    margin: 20,
  },
  fillCapture: {
    height: 70,
    width: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
