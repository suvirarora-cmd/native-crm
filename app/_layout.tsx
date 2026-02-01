import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../hooks/context/AuthContext';
import { ThemeProvider } from '../hooks/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="home" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
