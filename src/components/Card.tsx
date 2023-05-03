interface CardProps {
  image: string;
  onClick: () => void;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  image,
  onClick,
  selected,
}) => {
  return (
    <div className="card">
      <div className={selected ? 'selected' : ''}>
        <img alt="" src={image} className="card-face" />
        <img alt="" src={'/assets/cactus.png'} className="card-back"/>
      </div>
    </div>
  );
};