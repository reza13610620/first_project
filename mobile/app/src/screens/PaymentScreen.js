import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>پرداخت</Text>
      <Text>مبلغ: 1,000,000 تومان</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});

export default PaymentScreen;