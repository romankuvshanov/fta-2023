import "./Game.scss";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back.svg";

const contentStyle = {
  borderBottom: "25px solid rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
  margin: "auto",
};

export default function Game() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <>
      <header className={"header"}>
        <span>
          <Link to={"/"} className={"header__back-link"}>
            <img src={arrowBack} alt={"Go back icon"} />
          </Link>
        </span>
        <h1 className={"header__headline"}>Call Of Duty: Warzone</h1>
      </header>
      <div className={"thumbnail-info-requirements-wrapper"}>
        <img
          src={"https://www.freetogame.com/g/452/thumbnail.jpg"}
          width={365}
          height={206}
          alt={"Game thumbnail"}
          className={"game-thumbnail"}
        />
        <div>
          <h2 className={"small-title"}>Game's information:</h2>
          <div className={"game-info-wrapper"}>
            <p className={"game-info-title"}>
              Release date:{" "}
              <span className={"game-info-title__info"}>03.10.2020</span>
            </p>
            <p className={"game-info-title"}>
              Publisher:{" "}
              <span className={"game-info-title__info"}>Activision</span>
            </p>
            <p className={"game-info-title"}>
              Developer:{" "}
              <span className={"game-info-title__info"}>Infinity Ward</span>
            </p>
            <p className={"game-info-title"}>
              Genre: <span className={"game-info-title__info"}>Shooter</span>
            </p>
          </div>
        </div>
        <div>
          <h2 className={"small-title"}>System Requirements:</h2>
          <div className={"game-system-requirements-wrapper"}>
            <p className={"game-info-title"}>
              OS:{" "}
              <span className={"game-info-title__info"}>
                Windows 7 64-Bit (SP1) or Windows 10 64-Bit
              </span>
            </p>
            <p className={"game-info-title"}>
              Processor:{" "}
              <span className={"game-info-title__info"}>
                Intel Core i3-4340 or AMD FX-6300
              </span>
            </p>
            <p className={"game-info-title"}>
              Memory: <span className={"game-info-title__info"}>8GB RAM</span>
            </p>
            <p className={"game-info-title"}>
              Graphics:{" "}
              <span className={"game-info-title__info"}>
                NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950
              </span>
            </p>
            <p className={"game-info-title"}>
              Storage:{" "}
              <span className={"game-info-title__info"}>175GB HD space</span>
            </p>
          </div>
        </div>
      </div>
      <h2 className={"small-title small-title__screenshots"}>Screenshots: </h2>
      <Carousel afterChange={onChange} autoplay>
        <div>
          <img
            src={"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-1.jpg"}
            alt={"Screenshot from the game"}
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-2.jpg"}
            alt={"Screenshot from the game"}
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-3.jpg"}
            alt={"Screenshot from the game"}
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={"https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg"}
            alt={"Screenshot from the game"}
            style={contentStyle}
          />
        </div>
      </Carousel>
    </>
  );
}
