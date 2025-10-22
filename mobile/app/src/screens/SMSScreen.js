import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function SMSScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = () => {
    setMessage("کد تأیید ارسال شد"); // Simulated
    console.log(`Sending code to ${mobile}`);
  };

  const handleVerifyCode = () => {
    if (code === "123456") { // Simulated code
      setMessage("شماره تأیید شد");
      navigation.navigate('Profile');
    } else {
      setMessage("کد تأیید نامعتبر است");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تأیید شماره موبایل</Text>
      <TextInput
        style={styles.input}
        placeholder="شماره موبایل"
        value={mobile}
        onChangeText={setMobile}
        maxLength={11}
      />
      <Button title="ارسال کد تأیید" onPress={handleSendCode} />
      <TextInput
        style={styles.input}
        placeholder="کد تأیید"
        value={code}
        onChangeText={setCode}
        maxLength={6}
      />
      <Button title="تأیید کد" onPress={handleVerifyCode} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 },
  message: { textAlign: 'center', marginTop: 10 },
});

export default SMSScreen;