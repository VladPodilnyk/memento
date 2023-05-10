import { useCallback, useState } from 'react';
import { IMAGES, randomCards, shuffle } from '../utils/shuffle';
import { Card } from '../domain/Card';

const updateMatchedImages = (cards: Card[], image: string) => {
  return cards.map((card) => {
    if (card.image === image) {
      return {
        ...card,
        matched: true,
      };
    }
    return card;
  });
};

// ms
const TIMEOUT = 1000;

export const useGameState = () => {
  const [cards, setCards] = useState(randomCards());

  // our two consecutive choices
  const [pickOne, setPickOne] = useState<Card>();
  const [pickTwo, setPickTwo] = useState<Card>();

  const [wins, setWins] = useState(() => {
    const wins = localStorage.getItem('wins');
    return wins ? parseInt(wins, 10) : 0;
  });

  // prevent clicking on cards during animation
  const [disabled, setDisabled] = useState(false);

  // shuffling images, but not cards, so we won't regenerate index and avoid re-rendering
  const shuffleCards = useCallback(() => {
    const randomImages = shuffle(IMAGES);
    setCards(cards.map((card, index) => ({ ...card, image: randomImages[index], matched: false })));
  }, [cards]);

  const handleCardClick = useCallback((card: Card) => {
    return () => {
      if (!disabled) {
        pickOne ? setPickTwo(card) : setPickOne(card);
      }
    };
  }, [pickOne, disabled]);

  const handleTurn = useCallback(() => {
    setPickOne(undefined);
    setPickTwo(undefined);
    setDisabled(false);
  }, []);

  const onNewGame = useCallback(() => {
    handleTurn();
    setCards(randomCards());
    setWins(0);
  }, [handleTurn]);

  const updateCardsAndSetTimeout = useCallback(() => {
    let pickTimer: number;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((cards) => updateMatchedImages(cards, pickOne.image));
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, TIMEOUT);
      }
    }
    return () => clearTimeout(pickTimer);
  }, [handleTurn, pickOne, pickTwo]);

  const updateWins = useCallback(() => {
    let timer: number;
    const matchedCards = cards.filter((card) => !card?.matched);
    if (matchedCards.length === 0) {
      console.log('You win!');
      setWins((wins) => {
        const updatedCounter = wins + 1;
        localStorage.setItem('wins', updatedCounter.toString());
        return updatedCounter;
      });
      timer = setTimeout(() => {
        handleTurn();
        shuffleCards();
      }, TIMEOUT);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [cards, handleTurn, shuffleCards]);

  return {
    cards,
    pickOne,
    pickTwo,
    wins,
    handleCardClick,
    onNewGame,
    updateCardsAndSetTimeout,
    updateWins,
  };
};