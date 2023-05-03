import { Header } from './components/Header';
import { useState } from 'react';
import { shuffle } from './utils/shuffle';
import { Card } from './components/Card';

export const App: React.FC = () => {
  const [cards, setCards] = useState(shuffle());

  // out consecutive choices
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);

  const [wins, setWins] = useState(0);


  return (
    <div>
      <Header wins={wins} onReset={() => console.log('damn') } />
      <div className="grid">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              image={card.image}
              selected={card.matched}
              onClick={() => console.log('damn') }
            />
          );
        })}
      </div>
    </div>
  );
};