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
        return (
          <View style={styles.addButtonWrapper}>
            <Ellipse1 style={styles.addButtonCircle} width={iconSize*2.5} height={iconSize*2.5} />
            <Firshourglassend style={styles.hourglassIcon} width={iconSize} height={iconSize} fill={iconFillColor} />
          </View>
      );
    case 'friends':
      return <Firsworld width={iconSize} height={iconSize} fill={iconFillColor} />;
    case 'account':
      return <Firsuser width={iconSize} height={iconSize} fill={iconFillColor} />;
    default:
      return null;
  }
};

// const getIcon = (routeName, isFocused) => {
//   const iconFillColor = isFocused ? '#9b4615' : '#A9A9A9'; // Active: Brown, Inactive: Gray
//   const iconSize = 25; // Icon size

//   switch (routeName) {
//     case 'index': // Home
//       return <Firshome width={iconSize} height={iconSize} fill={iconFillColor} />;
//     case 'library': // Library
//       return <Fissbook width={iconSize} height={iconSize} fill={iconFillColor} />;
    // case 'add': // Add (Special Center Button)
    //   return (
    //     <View style={styles.addButtonWrapper}>
    //       <Ellipse1 style={styles.addButtonCircle} width={60} height={60} />
    //       <Firshourglassend width={30} height={30} fill={iconFillColor} />
    //     </View>
    //   );
//     case 'friends': // Friends
//       return <Firsworld width={iconSize} height={iconSize} fill={iconFillColor} />;
//     case 'account': // Account
//       return <Firsuser width={iconSize} height={iconSize} fill={iconFillColor} />;
//     default:
//       return null;
//   }
// };  

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
    fontSize: 15,
    marginTop: 5,
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 30, // Increase this to raise the button higher
    alignSelf: 'center', // Center it horizontally
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Ensure it stays above other elements
    
  },
  addButtonCircle: {
    borderRadius: 35, // Half of the width/height to keep the circle
    backgroundColor: '#fff',
    elevation: 5, // Shadow for elevation
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  
});

export default TabBar;
