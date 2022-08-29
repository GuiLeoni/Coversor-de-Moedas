import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Picker from './src/components/Picker';
import api from './src/services/api';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGuuF0H1ywyteRcaUDp_XylkeTZIa1NLU",
  authDomain: "conversor-de-moedas-doleleo.firebaseapp.com",
  projectId: "conversor-de-moedas-doleleo",
  storageBucket: "conversor-de-moedas-doleleo.appspot.com",
  messagingSenderId: "1020161202437",
  appId: "1:1020161202437:web:3ab50ce33683156d99bf6c",
  measurementId: "G-KQ381NSR3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App(){
  //states
  const [ moedas, setMoedas ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ moedaSelecionada, setMoedaSelecionada ] = useState(null);
  const [ moedaBValor, setMoedaBValor ] = useState(0);
  const [ valorMoeda, setValorMoeda ] = useState(null);
  const [ valorConvertido, setValorConvertido ] = useState(0);
  //bacK-end
  useEffect(() => {
    async function lerMoedas() {
      const resposta = await api.get('all');

      // Objeto.keys(resposta.data) - retorna as keys da api que no nosso caso é o nome de cada objeto (USD, BRL, EUR)
      let arrayMoedas = [];
      Object.keys(resposta.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label:key,
          value:key
        })
      })
        setMoedas(arrayMoedas);
        setLoading(false);

    }
    lerMoedas();
   }, []);

   async function converter(){
    if(moedaSelecionada === null || moedaBValor === 0){
      alert("por favor selecione uma moeda!!!");
      return;
    }
      const resposta = await api.get(`all/${ moedaSelecionada}-BRL`);

      let resultado = (resposta.data[ moedaSelecionada ].ask * parseFloat(moedaBValor));
      setValorConvertido(`R$ ${resultado.toFixed(2) }`);
      setValorMoeda(moedaBValor);
      Keyboard.dismiss();
   }

   if(loading){
    return(
      <View style={[ styles.container, {justifyContent: 'center'} ] }>
        <ActivityIndicator color="#f9f9f9" size={45}/>
      </View>
    )
   }else{
    //front-end 
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
        <Text style={styles.title}>Selecione sua moeda</Text>
        <Picker moedas={moedas} onChange={(moedas) => setMoedaSelecionada(moeda)}/>
        </View>

        <View style={styles.areaValor}>
          <Text style={styles.title}>Digite um valor para converter em (R$)  </Text>
          <TextInput placeholder="Ex. : 150" style={styles.input} keyboardType="number" onChangeText={(valor) => setMoedaBValor(valor)}/>
        </View>

        <TouchableOpacity style={styles.btnArea} onPress={converter}>
          <Text style={styles.btnText}>Converter</Text>
        </TouchableOpacity>

        { valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda} {moedaSelecionada}
            </Text>
            <Text style={[styles.valorConvertido, {fontSize:18, margin: 10, fontWeight: 'normal'} ] }>
              Corresponde a 
            </Text>
            <Text style={styles.valorConvertido}>{valorConvertido}</Text>
          </View>
        )}

        </View>
        </TouchableWithoutFeedback>
    )
   }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#101215",
    paddingTop: 40,
  },
  areaMoeda: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#000",
    paddingTop: 5,
    paddingLeft: 5,
  },
  areaValor: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    paddingVertical: 8,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: "#000",
  },
  btnArea: {
    width: "100%",
    backgroundColor: "#fb4b57",
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  areaResultado: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: "30",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  valorConvertido: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 40,
  },
});
// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#161821',
//     paddingTop: 40, 

//   },
//   areaMoeda:{
//     width: '90%',
//     backgroundColor:'#f9f9f9',
//     paddingTop: 9,
//     borderTopLeftRadius: 9,
//     borderTopRightRadius: 9,
//     marginBottom:5 ,

//   },
//   title:{
//     fontSize: 16,
//     color: '#000',
//     paddingTop: 5,
//     paddingLeft: 5,
//   },
//   areaValor:{
//     width: '90%',
//     backgroundColor: '#fff',
//     paddingVertical:5 ,
//   },
//   input:{

//   },
//   btnText:{

//   },
//   btnArea:{

//   },
//   btnText:{

//   },
//   areaResultado:{

//   },
//   valorConvertido:{

//   },


// })

export default App;
