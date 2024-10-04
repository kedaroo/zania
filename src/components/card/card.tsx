import { Card as TCard } from "../../types";
import Image from "../image/image";
import Spinner from "../spinner/spinner";

interface CardProps {
  card: TCard;
  onDragStart: () => void;
  onDrop: () => void;
  onClick: () => void;
}

export default function Card(props: CardProps) {
  return (
    <div
      className="card-wrapper"
      key={props.card.id}
      draggable
      onDragOver={(e) => e.preventDefault()}
      onDragStart={props.onDragStart}
      onDrop={props.onDrop}
      onClick={props.onClick}
    >
      <div>{props.card.title}</div>
      <Image
        draggable={false}
        className="card-image"
        src={props.card.thumbnail}
        loader={<Spinner width={20} />}
      />
    </div>
  );
}
