import "./GameCard.scss";
import thumbnailPlaceholder from "../../assets/images/thumbnail_placeholder.png";
import { Link } from "react-router-dom";

export default function GameCard({ gameData }) {
  return (
    <div className={"game-card"}>
      <Link to={`/game/${gameData?.id}`}>
        <img
          src={gameData?.thumbnail || thumbnailPlaceholder}
          alt={"Game thumbnail"}
          width={365}
          height={206}
          className={"game-card__thumbnail"}
        />
      </Link>
      <div className={"game-card__game-info"}>
        <p className={"game-info__title"}>
          <Link to={`/game/${gameData?.id}`} className={"game-info__link"}>
            {gameData?.title || "?"}
          </Link>
        </p>
        <p className={"game-info__pre-text"}>
          Release date:{" "}
          <span className={"game-info__text"}>
            {(gameData?.release_date &&
              new Date(gameData?.release_date).toLocaleDateString("ru-RU")) ||
              "?"}
          </span>
        </p>
        <p className={"game-info__pre-text"}>
          Publisher:{" "}
          <span className={"game-info__text"}>
            {gameData?.publisher || "?"}
          </span>
        </p>
        <p className={"game-info__pre-text"}>
          Genre:{" "}
          <span className={"game-info__text"}> {gameData?.genre || "?"}</span>
        </p>
      </div>
    </div>
  );
}
