import { Header } from './components/Header';
import { useEffect } from 'react';
import { CardComponent } from './components/CardComponent';
import { useGameState } from './hooks/useGameState';

export const App: React.FC = () => {
  const {
    cards,
    pickOne,
    pickTwo,
    wins,
    handleCardClick,
    onNewGame,
    updateCardsAndSetTimeout,
    updateWins,
  } = useGameState();

  useEffect(() => {
    return updateCardsAndSetTimeout();
  }, [updateCardsAndSetTimeout]);

  useEffect(() => {
    return updateWins();
  }, [updateWins]);

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