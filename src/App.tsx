import { Header } from './components/Header';
import { useCallback, useEffect, useState } from 'react';
import { IMAGES, randomCards, shuffle } from './utils/shuffle';
import { CardComponent } from './components/Card';
import { Card } from './domain/Card';

export const App: React.FC = () => {
  const [cards, setCards] = useState(randomCards);

  // our two consecutive choices
  const [pickOne, setPickOne] = useState<Card>();
  const [pickTwo, setPickTwo] = useState<Card>();

  const [wins, setWins] = useState(0);

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
    setCards(shuffle);
    setWins(0);
  }, [handleTurn]);

  useEffect(() => {
    let pickTimer: number;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((state) => {
          return state.map((card) => {
            if (card.image === pickOne.image) {
              return {
                ...card,
                matched: true,
              };
            }
            return card;
          });
        }
        );
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }

      return () => {
        clearTimeout(pickTimer);
      };
    }
  }, [pickOne, pickTwo, cards, wins, handleTurn]);

  useEffect(() => {
    let timer: number;
    const matchedCards = cards.filter((card) => !card?.matched);
    if (matchedCards.length === 0) {
      console.log('You win!');
      setWins((wins) => wins + 1);
      timer = setTimeout(() => {
        handleTurn();
        shuffleCards();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [cards, handleTurn, shuffleCards]);

  return (
    <div>
      <Header wins={wins} onReset={onNewGame} />
      <div className="grid">
        {cards.map((card) => {
          const isMatched = card.matched ?? false;
          return (
            <CardComponent
              key={card.id}
              image={card.image}
              selected={card === pickOne || card === pickTwo || isMatched}
              onClick={handleCardClick(card)}
            />
          );
        })}
      </div>
    </div>
  );
};