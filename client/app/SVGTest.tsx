import React from 'react';
import { View, Text } from 'react-native';
import Firshome from "../assets/firshome.svg";

const SVGTest = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SVG Test</Text>
      <Firshome width={100} height={100} />
    </View>
  );
};

export default SVGTest;
