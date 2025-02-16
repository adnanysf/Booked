import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';

import Firshome from "../assets/firshome.svg";
import Fissbook from "../assets/fissbook.svg";
import Firsworld from "../assets/firsworld.svg";
import Firsuser from "../assets/firsuser.svg";
import Ellipse1 from "../assets/ellipse-1.svg";
import Firshourglassend from "../assets/firshourglassend.svg";

const TabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
const getIcon = (routeName, isFocused) => {
  const iconFillColor = isFocused ? '#9b4615' : '#A9A9A9'; // Active: Brown; Inactive: Gray
  const iconSize = 25;

  switch (routeName) {
    case 'home':
      return <Firshome width={iconSize} height={iconSize} fill={iconFillColor} />;
    case 'library':
      return <Fissbook width={iconSize} height={iconSize} fill={iconFillColor} />;
    case 'time':
      return <Firshourglassend width={iconSize} height={iconSize} fill={iconFillColor} />;
    case 'friends':
      return <Firsworld width={iconSize} height={iconSize} fill={iconFillColor} />;
    case 'account':
      return <Firsuser width={iconSize} height={iconSize} fill={iconFillColor} />;
    default:
      return null;
  }
};

  

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <PlatformPressable
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tabItem}
          >
            {getIcon(route.name, isFocused)}
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? '#9b4615' : '#A9A9A9' }
            ]}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 81,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourglassIcon: {
    position: 'absolute',
  },
});

export default TabBar;
