export type Items = {
  [key: string]: string;
};

export type Sentence = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type LevelType = {
  rounds: {
    levelData: {
      id: string;
      name: string;
      imageSrc: string;
      cutSrc: string;
      author: string;
      year: string;
    };
    words: Sentence[];
  }[];
};
