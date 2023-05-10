interface HeaderProps {
  wins: number;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  wins,
  onReset,
}) => {
  return (
    <header className="header">
      <h4>wins: {wins}</h4>
      <h3>Memento Game</h3>
      <button onClick={onReset}>New game</button>
    </header>
  );
};