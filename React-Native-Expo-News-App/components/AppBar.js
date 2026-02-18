
// ...existing code...
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Header = ({ theme, isDark, onToggleTheme }) => {
  return (
    <View style={{ backgroundColor: theme.background, paddingTop: 38, paddingBottom: 0 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 0 }}>
        <Text
          style={{
            fontFamily: theme.serifFont,
            fontSize: 44,
            color: theme.text,
            fontWeight: 'bold',
            letterSpacing: 0.5,
            marginLeft: 22,
            marginBottom: 0,
          }}
        >
          News
        </Text>
        <TouchableOpacity
          onPress={onToggleTheme}
          style={{
            backgroundColor: theme.card,
            borderRadius: 16,
            padding: 8,
            borderWidth: 1,
            borderColor: theme.primary,
            marginRight: 18,
          }}
          accessibilityLabel="Toggle dark/light mode"
        >
          <Text style={{ fontSize: 18, color: theme.primary }}>
            {isDark ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Accent line */}
      <View style={{ height: 4, backgroundColor: theme.primary, marginTop: 18, marginBottom: 8, marginHorizontal: 0, borderRadius: 2 }} />
    </View>
  );
};

export default Header;