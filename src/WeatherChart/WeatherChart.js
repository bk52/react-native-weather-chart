import Svg, {Circle, Text, Line, ForeignObject} from 'react-native-svg';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import GetIcon from './WeatherChartIcons';
const Interpolate = (value, minVal, maxVal, YTop, YBottom) => {
  return YBottom - ((value - minVal) / (maxVal - minVal)) * (YBottom - YTop);
};

const WeatherChart = ({data, settings}) => {
  const [chartSize, setchartSize] = useState({width: 0, height: 0});
  const {values, textTop, textBottom, iconTop, iconBottom} = data;
  if (!values) return new Error('values field is required');
  let c = {
    colSpace: 100,
    fontSizeTop: 12,
    fontSizeBottom: 12,
    iconSize: 30,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 30,
    marginRight: 30,
    markerSize: 4,
    markerStrokeSize: 1.5,
    showTextTop: true,
    showTextBottom: true,
    showIconTop: true,
    showIconBottom: true,
    showVerticalLines: true,
    lineColor: 'lightgray',
    vlineColor: 'lightgray',
    vlineStroke: '5,5',
    topTextColor: '#A6BCD0',
    bottomTextColor: '#A6BCD0',
    markerFillColor: 'white',
    markerStrokeColor: 'lightgray',
    noDataText: 'There is no data',
    noDataTextColor: '#A6BCD0',
    noDataFontSize: 12,
    iconTopColor: '#fff',
    iconBottomColor: '#fff',
    ...settings,
  };
  let minVal = 0,
    maxVal = 0;
  const chartWidth =
    values && values.length > 0
      ? (values.length - 1) * c.colSpace + c.marginLeft + c.marginRight
      : chartSize.width;

  const YTextTop = c.marginTop + c.fontSizeTop;
  const YTextBottom = chartSize.height - c.fontSizeBottom - c.marginBottom;
  const YIconTop = c.marginTop + (c.showTextTop ? c.fontSizeTop + 5 : 0);
  const YIconBottom =
    chartSize.height -
    (c.showTextBottom ? 12 + c.fontSizeBottom : 0) -
    (c.showIconBottom ? c.iconSize : 0) -
    c.marginBottom;
  const YTop = YIconTop + (c.showIconTop ? c.iconSize : 0) + c.markerSize;
  const YBottom = YIconBottom - c.markerSize;
  if (values.length > 0) {
    let sortedValues = [...values];
    sortedValues.sort(function (a, b) {
      return a - b;
    });
    minVal = sortedValues[0];
    maxVal =
      values.length == 1
        ? sortedValues[0] + 1
        : sortedValues[sortedValues.length - 1];
  }
  let calculatedY = [];
  values.map(item => {
    calculatedY.push(Interpolate(item, minVal, maxVal, YTop, YBottom));
  });
  const onLayout = e => {
    const {height, width} = e.nativeEvent.layout;
    setchartSize({width, height});
  };
  const iconSettings = {width: '100%', height: '100%', fill: '#fff'};
  return (
    <ScrollView horizontal={true} onLayout={onLayout} style={{minHeight: 100}}>
      <Svg height="100%" width={chartWidth}>
        {values.length == 0 ? (
          <>
            <Text
              fill={c.noDataTextColor}
              fontSize={c.noDataFontSize}
              x="50%"
              y="50%"
              textAnchor="middle">
              {c.noDataText}
            </Text>
          </>
        ) : (
          values.map((item, index) => (
            <React.Fragment key={`F1${index}`}>
              {index !== values.length - 1 && (
                <Line
                  key={`L1${index}`}
                  stroke={c.lineColor}
                  x1={c.marginLeft + c.colSpace * index}
                  y1={calculatedY[index]}
                  x2={c.marginLeft + c.colSpace * (index + 1)}
                  y2={calculatedY[index + 1]}
                />
              )}
              {c.showVerticalLines && (
                <Line
                  key={`VL1${index}`}
                  stroke={c.vlineColor}
                  strokeDasharray={c.vlineStroke}
                  x1={c.marginLeft + c.colSpace * index}
                  y1={YBottom}
                  x2={c.marginLeft + c.colSpace * index}
                  y2={calculatedY[index]}
                />
              )}
              {c.showTextTop && (
                <Text
                  key={`T1${index}`}
                  fill={c.topTextColor}
                  fontSize={c.fontSizeTop}
                  x={c.marginLeft + c.colSpace * index}
                  y={YTextTop}
                  textAnchor="middle">
                  {textTop && textTop[index] ? textTop[index] : ''}
                </Text>
              )}
              {c.showIconTop && iconTop && iconTop[index] && (
                <ForeignObject
                  key={`FO1${index}`}
                  x={c.marginLeft + c.colSpace * index - c.iconSize * 0.5}
                  y={YIconTop}>
                  {GetIcon(iconTop[index], {
                    width: c.iconSize,
                    height: c.iconSize,
                    fill: c.iconTopColor,
                  })}
                </ForeignObject>
              )}
              <Circle
                key={`C1${index}`}
                cx={c.marginLeft + c.colSpace * index}
                cy={calculatedY[index]}
                r={c.markerSize}
                stroke={c.markerStrokeColor}
                strokeWidth={c.markerStrokeSize}
                fill={c.markerFillColor}
              />
              {c.showIconBottom && iconBottom && iconBottom[index] && (
                <ForeignObject
                  key={`FO2${index}`}
                  x={c.marginLeft + c.colSpace * index - c.iconSize * 0.5}
                  y={YIconBottom}>
                  {GetIcon(iconBottom[index], {
                    width: c.iconSize,
                    height: c.iconSize,
                    fill: c.iconBottomColor,
                  })}
                </ForeignObject>
              )}
              {c.showTextBottom && (
                <Text
                  key={`T2${index}`}
                  fill={c.bottomTextColor}
                  fontSize={c.fontSizeBottom}
                  x={c.marginLeft + c.colSpace * index}
                  y={YTextBottom}
                  textAnchor="middle">
                  {textBottom && textBottom[index] ? textBottom[index] : ''}
                </Text>
              )}
            </React.Fragment>
          ))
        )}
      </Svg>
    </ScrollView>
  );
};
const WeatherChartMemoized = React.memo(WeatherChart);
export default WeatherChartMemoized;
