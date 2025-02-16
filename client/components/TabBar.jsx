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
      return (
        <View style={{ color: iconFillColor }}>
          <Firshome width={iconSize} height={iconSize} style={{color: iconFillColor, fill: iconFillColor}} />
        </View>
      )
      case 'account':
        return <Firsuser width={iconSize} height={iconSize} style={{color: iconFillColor, fill: iconFillColor}} />;
      default:

      case 'time':
        return (
          <View style={[styles.addButtonWrapper, { color: isFocused ? '#ffff' : '#ffff', fill: isFocused ? '#ffff' : '#ffff'}]}>
            <Ellipse1 style={styles.addButtonCircle} width={iconSize*2.5} height={iconSize*2.5} />
            <Firshourglassend style={[styles.hourglassIcon, {color: '#ffff'}]} width={iconSize} height={iconSize} />
          </View>
      );
    case 'friends':
      return <Firsworld width={iconSize} height={iconSize} color={iconFillColor} />;
    case 'library':
        return <Fissbook width={iconSize} height={iconSize} color={iconFillColor} />;
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
              { color: isFocused ? '#9b4615' : '#A9A9A9' },
              // {borderTopColor: isFocused ? '#9b4615' : '#fff', borderTopWidth: 2}
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
    height: 100,
    alignItems: 'center',
    // marginBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 15,
    marginTop: 5,
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, 
  },
  addButtonCircle: {
    borderRadius: 35,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  hourglassIcon:{
    position: 'absolute',
  }
  
});

export default TabBar;
