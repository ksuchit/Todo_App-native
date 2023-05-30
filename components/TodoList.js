import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

function TodoList() {
  const [todo, setTodo] = useState([])
  
  useEffect(async() => {
    setTodo(await AsyncStorage.getItem("todo"))
    console.log("inside todo")
    console.log(JSON.parse(await AsyncStorage.getItem("todo")))
  },[])

  return (
    <View>
      <Text>Inside Todo list</Text>
      {todo?.map((data) => 
      <View>
        <Text>{data.title}</Text>
        <Text>{data.details}</Text>
      </View>
  )}
    </View>
  )
}

export default TodoList