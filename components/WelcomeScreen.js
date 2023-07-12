import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:15}}>
        <Text style={styles.title}>Welcome to Todo</Text>
        <Text style={styles.subTitle}>
          Please login to your account or create new account to continue
        </Text>
      </View>
      <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Auth")}>
        <Text style={{color:'white',fontSize:20,fontWeight:500}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center',
    padding: 20,
    gap: 50,
    backgroundColor:'#f0f0f5'
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
  },
  subTitle: {
    fontWeight: "500",
    fontSize: 20,
    color: "grey",
  },
  buttons: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10,
    paddingHorizontal: 40,
    backgroundColor: 'grey',
    borderRadius:15
  },
});
export default WelcomeScreen;
