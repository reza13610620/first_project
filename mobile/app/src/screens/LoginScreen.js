import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { identifier, password });
    navigation.navigate('Profile'); // Simulated login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ورود به سیستم</Text>
      <TextInput
        style={styles.input}
        placeholder="شماره موبایل یا کد ملی"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TextInput
        style={styles.input}
        placeholder="رمز عبور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="ورود" onPress={handleLogin} />
      <Button title="ثبت نام" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 },
});

export default LoginScreen;