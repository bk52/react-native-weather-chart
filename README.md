![Cover](https://user-images.githubusercontent.com/24523985/118378101-ffdaeb80-b5d9-11eb-892f-38427ee34d75.jpg)

# React Native Weather Chart
`react-native-weather-chart` provides create weather chart with SVG. This library uses 
[`weather-icons`](https://github.com/erikflowers/weather-icons) as default.

## Installation
1) `npm i react-native-svg` install peer dependencies [More Info](https://github.com/react-native-svg/react-native-svg)
2) `npm i react-native-svg-transformer --save-dev` 
3) Configure the react native packager for [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)
#### For React Native v0.57 or newer
Merge the contents from your project's `metro.config.js` file with this config (create the file if it does not exist already).

```js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
```
4) `npm i react-native-weather-chart`

## Quick Example
```js
import React from 'react';
import {StyleSheet, View} from 'react-native';
import WeatherChart from 'react-native-weather-chart';

const Data = {
  values: [23, 24, 25, 20, 15],
  textBottom: ['23°', '24°', '25°', '20°', '15°'],
  iconBottom: ['DayCloudy', 'DaySunny', 'DaySunny', 'DayCloudy', 'DayRain'],
};

const Settings = {
  showTextTop: false,
  showTextBottom: true,
  showIconTop: false,
  showIconBottom: true,
};

const App = () => {
  return (
    <View style={styles.viewChart}>
      <WeatherChart data={Data} settings={Settings} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewChart: {
    backgroundColor: '#212B34',
    margin: 10,
    height: 160,
  },
});

export default App;
```
