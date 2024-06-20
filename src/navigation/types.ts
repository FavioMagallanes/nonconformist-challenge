import {StackNavigationProp} from '@react-navigation/stack';
import {Photo} from '../context/photo-context';

export type RootStackParamList = {
  Home: undefined;
  PhotoScreen: {photo: Photo};
  TakePhoto: undefined;
  Splash: undefined;
};
export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;
