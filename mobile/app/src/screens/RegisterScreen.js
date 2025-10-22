import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function RegisterScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Register:', { mobile, nationalCode, password });
    navigation.navigate('SMS'); // Go to SMS verification
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ثبت نام کاربر</Text>
      <TextInput
        style={styles.input}
        placeholder="شماره موبایل"
        value={mobile}
        onChangeText={setMobile}
        maxLength={11}
      />
      <TextInput
        style={styles.input}
        placeholder="کد ملی"
        value={nationalCode}
        onChangeText={setNationalCode}
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        placeholder="رمز عبور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="ثبت نام" onPress={handleRegister} />
      <Button title="بازگشت" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 },
});

export default RegisterScreen;