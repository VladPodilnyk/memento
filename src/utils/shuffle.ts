import { Card } from '../domain/Card';

export const IMAGES = [
  '/assets/daisy-in-jar.png',
  '/assets/daisy-in-jar.png',
  '/assets/daisy-in-jar.png',
  '/assets/daisy-in-jar.png',
  '/assets/mini-cactus.png',
  '/assets/mini-cactus.png',
  '/assets/mini-cactus.png',
  '/assets/mini-cactus.png',
];

export const shuffle = <T>(values: T[]): T[] => {
  return [...values, ...values]
    .sort(() => Math.random() - 0.5);
};

export const randomCards: Card[] = shuffle(IMAGES).map((image) => {
  return {
    id: Math.random(),
    image,
    matched: false,
  };
});