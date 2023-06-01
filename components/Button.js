import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ title, onPress, color = "#2196F3" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const LoginButton = ({ title, onPress, color = "#2196F3" }) => {
  return (
    <TouchableOpacity
      style={[styles.login, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const SignoutButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.signout} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const UpdateButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.signout, styles.update]} onPress={onPress}>
      <Text style={styles.updateDeleteText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const DeleteButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.signout, styles.delete]} onPress={onPress}>
      <Text style={styles.updateDeleteText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  login: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 25,
    // width: "80%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
    padding:2, 
  },
  updateDeleteText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    paddingHorizontal: 2, 
    paddingVertical:1
  },
  signout: {
    backgroundColor: "#2196F3",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  delete: {
    backgroundColor: "#F08080",
  },
});
