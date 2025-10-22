import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>لیست محصولات</Text>
      <Text>محصول: حلقه طلا - قیمت: 5,000,000 تومان</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});

export default ProductScreen;