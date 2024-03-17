import data1 from './wordCollectionLevel1.json';
import data2 from './wordCollectionLevel2.json';
import data3 from './wordCollectionLevel3.json';
import data4 from './wordCollectionLevel4.json';
import data5 from './wordCollectionLevel5.json';
import data6 from './wordCollectionLevel6.json';
import { LevelType } from '../types';

type Data = {
  [key: number]: LevelType;
};

const data: Data = {
  1: data1,
  2: data2,
  3: data3,
  4: data4,
  5: data5,
  6: data6,
};

export default data;
