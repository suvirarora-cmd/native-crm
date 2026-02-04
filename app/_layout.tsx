import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../hooks/context/AuthContext';
import { ThemeProvider } from '../hooks/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
         
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="signup/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="leads/index" options={{ title: 'My Leads' }} />
          <Stack.Screen name="leads/[id]" options={{ title: 'Lead Details' }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}