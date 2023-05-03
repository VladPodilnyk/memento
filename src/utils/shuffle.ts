import { Card } from '../domain/Card';

const images = [
  { image: '/assets/daisy-in-jar.png' },
  { image: '/assets/daisy-in-jar.png' },
  { image: '/assets/daisy-in-jar.png' },
  { image: '/assets/daisy-in-jar.png' },
  { image: '/assets/mini-cactus.png' },
  { image: '/assets/mini-cactus.png' },
  { image: '/assets/mini-cactus.png' },
  { image: '/assets/mini-cactus.png' },
];

export const shuffle = (): Card[] => {
  return [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((image) => ({ ...image, id: Math.random(), matched: false }));
};