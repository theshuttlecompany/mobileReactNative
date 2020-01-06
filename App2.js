/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { MapView } from 'tangram-es-react-native'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const ref = React.createRef()
  const x = require('./scene.yaml')
  console.log('hi')
  return (
    <>
      <SafeAreaView
        style={{flex:1}}
      >
        
        <MapView
          style={styles.map}
          scenePath={'./scene.yaml'}
          geoPosition=
           {{
              latitude: 23.1225,
              longitude: 72.5714
            }}
          zoom={14}
          maxZoom={16}
          minZoom={11}
          onSceneReady={() => console.log('mdasdas')}
        />
          
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});



export default App;
