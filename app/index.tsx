import AddButton from "@/components/AddButton";
import SaveButton from "@/components/SaveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<Number | undefined>(undefined);
  const [profile, setProfile] = useState<string | null>(null);

  const storeImage = async (value) => {
        try {
          await AsyncStorage.setItem('profile', value);
          setProfile(value);
          setImage(null);
          Alert.alert("Imagem Salva");
        } catch (error) {
         console.error("algo deu erro ao salvar a imagem!!!!!!");
        }
    };

    const getImage = async () => {
      try {
        const value = await AsyncStorage.getItem('profile');
        if (value !== null) {
          setProfile(value);
        }
      } catch (error) {
        console.error("Imagem não foi encontrada!!!!!!");
      }
    };
  
  const addFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileSize(result.assets[0]?.fileSize)
    }
  }

  const convertBytesToHuman = (size : Number|undefined)  =>{
      if(size == undefined){
        return "";
      }
      const kb = size / 1024;
      const mb = kb / 1024;
      if(mb > 1){
        return `${mb.toFixed(2)} Mb`;
      }
    return `${kb.toFixed(2)} Kb`;
  };

  useEffect(() => {
      getImage();
  }, []);

  return (
    <View  style={styles.container}     >
      <Text>Aqui vai ter a listagem de fotos</Text>
      <AddButton onPress={addFoto}></AddButton>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Text>{convertBytesToHuman(fileSize) }</Text>}
      {image && <SaveButton onPress={() => storeImage(image)}/>}

      {profile && <Text>Aqui vai ter a listagem de fotos</Text>}
      {profile && <Image source={{ uri: profile }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});
