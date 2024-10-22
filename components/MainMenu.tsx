// Components/MainMenuScreen.tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const MainMenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainMenuScreen;
