import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmContrasena, setConfirmContrasena] = useState('');

  const handleGuardar = () => {
    if (!nombre || !usuario || !contrasena || !confirmContrasena) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    
    if (contrasena !== confirmContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    
    // Aquí podrías enviar los datos a tu backend o base de datos
    console.log('Usuario guardado:', { nombre, usuario, contrasena });
    Alert.alert('Éxito', 'Usuario registrado correctamente');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Registrar Nuevo Usuario</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmContrasena}
          onChangeText={setConfirmContrasena}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Registrar Usuario</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#f7951d',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: 180,
    height: 90,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f7951d',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddUser;