import {Dimensions, PixelRatio, Platform} from 'react-native';

export const getFontSizeByWindowWidth = (fontSize: number) => {
  const {width} = Dimensions.get('screen');
  const baseWidth = Platform.OS === 'ios' ? 380 : 350;
  // const baseWidth = 380
  return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
};

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');
