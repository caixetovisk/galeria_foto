// SaveButton.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SaveButton = ({onPress}) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Salvar</Text>
     </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        borderRadius:10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#00a331ff"
      },
    text:{
        color: "#ffffffff",
        fontSize:20,        
    }
});

export default SaveButton;