import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { lightTheme, darkTheme } from './theme';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  // Animated background color for smooth theme transition
  const bgAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: isDark ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [lightTheme.background, darkTheme.background],
  });

  const handleToggleTheme = () => setIsDark((prev) => !prev);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}> 
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.primary} />
      <HomeScreen theme={theme} isDark={isDark} onToggleTheme={handleToggleTheme} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
