interface CardComponentProps {
  image: string;
  onClick: () => void;
  selected: boolean;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  image,
  onClick,
  selected,
}) => {
  return (
    <div className="card">
      <div className={selected ? 'selected' : ''}>
        <img alt="" src={image} className="card-face" />
        <img alt="" src={'/assets/chinese-coin.png'} className="card-back" onClick={onClick}/>
      </div>
    </div>
  );
};