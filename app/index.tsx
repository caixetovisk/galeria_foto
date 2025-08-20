import AddButton from "@/components/AddButton";
import DeleteButton from "@/components/DeleteButton";
import SaveButton from "@/components/SaveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const STORAGE_NAME = 'galeria';
  const [image, setImage] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<Number | undefined>(undefined);
  const [listaFotos, setListaFotos] = useState<Array<string>>([]);

  const storeImage = async (value: string) => {
    try {
      const fotos = [...listaFotos, value];
      setListaFotos(fotos);
      await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(fotos));
      setImage(null);
      Alert.alert("Imagem Salva");
    } catch (error) {
      console.error("algo deu erro ao salvar a imagem!!!!!!");
    }
  };

  const getImage = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_NAME);
      if (value !== null) {
        console.log(value);
        setListaFotos(JSON.parse(value));
      }
    } catch (error) {
      console.error("Imagem não foi encontrada!!!!!!");
    }
  };

  const removeImage = async (indice: number) => {
    try {
      const lista = [...listaFotos];
      lista.splice(indice, 1);
      if (lista.length > 0) {
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(lista));
        setListaFotos(lista);
      }
      if (lista.length === 0) {
        await AsyncStorage.removeItem(STORAGE_NAME);
        setListaFotos([]);
      }
    } catch (e) {
      console.error('Não foi possível excluir a Imagem');
    }
  }

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

  const convertBytesToHuman = (size: Number | undefined) => {
    if (size == undefined) {
      return "";
    }
    const kb = size / 1024;
    const mb = kb / 1024;
    if (mb > 1) {
      return `${mb.toFixed(2)} Mb`;
    }
    return `${kb.toFixed(2)} Kb`;
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}     >
      <Text style={styles.title}>My Galery</Text>
      <AddButton onPress={addFoto}></AddButton>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Text>{convertBytesToHuman(fileSize)}</Text>}
      {image && <SaveButton onPress={() => storeImage(image)} />}

      <ScrollView style={styles.scroolView}>
        {
          listaFotos.length > 0 && listaFotos.map((foto, indice) => (
            <View style={styles.galeria} id={`img-${indice}`} key={indice}>
              <Image source={{ uri: foto }} style={styles.image} />
              <DeleteButton onPress={() => removeImage(indice)} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
  },
  image: {
    width: 150,
    height: 150,
    padding: 3,
    marginRight: 5
  },
  title: {
    fontSize: 30,
    color: '#f8f8f8'
  },
  galeria: {
    flexDirection: 'row',
    padding: 5
  },
  scroolView: {
    marginTop: 10,
  }
});
