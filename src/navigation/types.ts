import {Photo} from '../context/photo-context';

export type RootStackParamList = {
  Home: undefined;
  PhotoScreen: {photo: Photo};
  TakePhoto: undefined;
};
