import { Card } from '../domain/Card';

export const IMAGES = [
  '/assets/barongsai.png',
  '/assets/chinese-hat.png',
  '/assets/chinese-symbol.png',
  '/assets/dragon-boat-festival.png',
  '/assets/gong.png',
  '/assets/paddles.png',
  '/assets/tea-egg.png',
  '/assets/kite.png',
];

export const shuffle = <T>(values: T[]): T[] => {
  return [...values, ...values]
    .sort(() => Math.random() - 0.5);
};

export const randomCards: () => Card[] = () => {
  return shuffle(IMAGES).map((image) => {
    return {
      id: Math.random(),
      image,
      matched: false,
    };
  });
};