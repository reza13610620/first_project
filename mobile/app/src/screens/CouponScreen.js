import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CouponScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>کوپن‌ها</Text>
      <Text>کد: DISCOUNT10 - تخفیف: 10%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});

export default CouponScreen;