import "./GameCard.scss";

export default function GameCard() {
  return (
    <div>
      <img
        src={"https://www.freetogame.com/g/452/thumbnail.jpg"}
        alt={"Game thumbnail"}
        width={365}
        height={206}
      />
      <div className={'game-card__game-info'}>
        <p className={'game-info__title'}>Call Of Duty: Warzone</p>
        <p className={'game-info__text'}>Release date: 03.10.2020</p>
        <p className={'game-info__text'}>Publisher: Activision</p>
        <p className={'game-info__text'}>Genre: Shooter</p>
      </div>
    </div>
  );
}
