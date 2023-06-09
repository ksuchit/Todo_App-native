import React from "react";
import { ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";

function StatusWiseFilter({ task, setShowYTranslate }) {
  // console.log(
  //   "StatusWiseFilter",
  //   task.filter((data, i) => data.status === "Pending")
  // );

  const statusArray = ["Pending", "No Status", "InProgress", "Complete"];

  const DATA = statusArray.map((status) => {
    return {
      title: status,
      data: task.filter((item) => item.status === status)
    };
  });
  console.log("DATA", DATA);
  
  //  DATA.map((item) => {
  //   console.log(item)
  //   return item
  // })
  const filterWiseData = (data, i) => {
    return (
      <View style={styles.task} key={i}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.inputTitle}>
            {data.title?.length > 15
              ? `${data.title?.slice(0, 15)}...`
              : data.title}
          </Text>
          <FontAwesome
            name={data.stared ? "star" : "star-o"}
            size={20}
            color={data.stared ? "#de9d10" : "black"}
          />
        </View>
        <View
          style={{
            borderBottomColor: "black",
            marginTop: 5,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ marginTop: 5, marginBottom: 10 }}>{data.details}</Text>
      </View>
    );
  };

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 1) setShowYTranslate(false);
  };
  return (
    <>
      <SectionList
        onScroll={handleScroll}
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section: {title} }) => (  //title as whole object so used destructuring...
            task.filter((data) => data.status === title).length > 0 &&
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  backgroundColor: "#dadae3",
                  paddingHorizontal: 25,
                paddingVertical: 5,
                }}
              >
                {/* {console.log("title",title)} */}

                <Text>{title}</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <Octicons name="tasklist" size={15} />
                  <Text>{task.filter((data) => data.status === title).length}</Text>
                </View>
              </View>
        )}
        stickySectionHeadersEnabled={true}
        renderItem={({ item, index }) => (
          <View style={[{ paddingHorizontal: 25, paddingBottom: 25 },index===0 ? {paddingTop:25} : {paddingTop:0}]}>
            {filterWiseData(item, index)}
          </View>
        )}
      />

      {/* <ScrollView onScroll={handleScroll}>
      {statusArray.map((status, index) => (
        <View key={index}>
        {task.filter((data) => data.status === status).length > 0 && <>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  backgroundColor: "#dadae3",
                  paddingHorizontal: 25,
                  paddingVertical: 5,
                }}
              >
                <Text>{status}</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <Octicons name="tasklist" size={15} />
                  <Text>
                    {task.filter((data) => data.status === status).length}
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 25, paddingBottom: 25 }}>
                {task
                  .filter((data, i) => data.status === status)
                  ?.map((data, i) => filterWiseData(data, i))}
            </View>
            </>
        }
            </View>
      ))}
      </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f5",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 30,
    // borderRightWidth: 0.5,
    // borderColor:'#de9d10'
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  task: {
    // borderWidth: 1,
    borderColor: "thistle",
    padding: 20,
    // marginTop: 25,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#dadae3",
    // position: "absolute",
    // top: 0,
  },
});
export default StatusWiseFilter;
