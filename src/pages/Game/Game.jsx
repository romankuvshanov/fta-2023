import "./Game.scss";
import { Button, Carousel, Result } from "antd";
import { Link, useParams } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back.svg";
import thumbnailPlaceholder from "../../assets/images/thumbnail_placeholder.png";
import screenShotPlaceholder from "../../assets/images/screenshot_placeholder.png";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const contentStyle = {
  borderBottom: "25px solid #23272B",
  boxSizing: "border-box",
  margin: "auto",
};

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "0f563ab817msh34a455c81e6427dp126b28jsne042c0cc6ef7",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        setGameData(data);
        setError(null);
        console.log(data);
      })
      .catch((error) => {
        setError(error?.message || "Something went wrong");
        setGameData(null);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [gameId]);

  return (
    <>
      {loading && (
        <div className={"loading"}>
          <LoadingOutlined className={"loading__icon"} />
          <p className={"loading__message"}>Loading... Please, wait</p>
        </div>
      )}

      {error && (
        <Result
          className={"error"}
          status="error"
          title="Submission Failed"
          subTitle={error}
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        ></Result>
      )}

      {console.log(error)}

      {gameData && (
        <>
          <header className={"header"}>
            <span>
              <Link to={"/"} className={"header__back-link"}>
                <img src={arrowBack} alt={"Go back icon"} />
              </Link>
            </span>
            <h1 className={"header__headline"}>{gameData?.title || "?"}</h1>
          </header>
          <div className={"thumbnail-info-requirements-wrapper"}>
            <img
              src={gameData?.thumbnail || thumbnailPlaceholder}
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
                  <span className={"game-info-title__info"}>
                    {(gameData?.release_date &&
                      new Date(gameData?.release_date).toLocaleDateString(
                        "ru-RU",
                      )) ||
                      "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Publisher:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.publisher || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Developer:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.developer || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Genre:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.genre || "?"}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h2 className={"small-title"}>System Requirements:</h2>
              <div className={"game-system-requirements-wrapper"}>
                <p className={"game-info-title"}>
                  OS:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.minimum_system_requirements?.os || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Processor:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.minimum_system_requirements?.processor || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Memory:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.minimum_system_requirements?.memory || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Graphics:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.minimum_system_requirements?.graphics || "?"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Storage:{" "}
                  <span className={"game-info-title__info"}>
                    {gameData?.minimum_system_requirements?.storage || "?"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <h2 className={"small-title small-title__screenshots"}>
            Screenshots:{" "}
          </h2>
          <Carousel className={"carousel"}>
            {gameData?.screenshots?.map((screenshot) => {
              return (
                <div key={screenshot?.id} className={"carousel__image-wrapper"}>
                  <img
                    src={screenshot?.image}
                    alt={"Screenshot from the game"}
                    style={contentStyle}
                  />
                </div>
              );
            }) || (
              <div className={"carousel__image-wrapper"}>
                <img
                  src={screenShotPlaceholder}
                  alt={"Screenshot placeholder"}
                  style={contentStyle}
                />
              </div>
            )}
          </Carousel>
        </>
      )}
    </>
  );
}
