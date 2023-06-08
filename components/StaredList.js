import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View } from 'react-native'

function StaredList() {
    const [user, setUser] = useState("")
    const [list, setList] = useState([])
    
    const getUser = async () => {
        const user = await AsyncStorage.getItem("@user")
        const parserdUser = JSON.parse(user)
        setUser(parserdUser.email)
    }

    const getData = async () => {
        const data = await AsyncStorage.getItem("todo")
        const parseData = JSON.parse(data)
        if (parseData.length > 0) {
            parseData.map((item) => {
                if (item[user] === user)
                    setList(item[user])
            })
        }
    }

    useFocusEffect(
        useCallback(() => {

            return()=>{}
        },[])
    )
  return (
    <View>
          
    </View>
  )
}

export default StaredList