import "./Game.scss";
import { Button, Carousel, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back.svg";
import thumbnailPlaceholder from "../../assets/images/thumbnail_placeholder.png";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetGameQuery } from "../../services/freetogame";

export default function Game() {
  const { gameId } = useParams();
  const { data, error, isFetching, refetch } = useGetGameQuery(gameId);
  const navigate = useNavigate();

  return (
    <>
      {error ? (
        <Result
          className={"error"}
          status="error"
          title="Error"
          subTitle={error?.error}
          extra={[
            <Button
              type="primary"
              onClick={() => navigate(-1)}
              key={"back-home"}
            >
              Back Home
            </Button>,
            <Button onClick={() => refetch()} key={"try-again"}>
              Try Again
            </Button>,
          ]}
        ></Result>
      ) : isFetching ? (
        <div className={"loading"}>
          <span className={"header__back-link"} onClick={() => navigate(-1)}>
              <img width={24} height={24} src={arrowBack} alt={"Go back icon"} />
            </span>
          <LoadingOutlined className={"loading__icon"} />
          <p className={"loading__message"}>Loading... Please, wait</p>
        </div>
      ) : data ? (
        <>
          <header className={"header"}>
            <span className={"header__back-link"} onClick={() => navigate(-1)}>
              <img width={24} height={24} src={arrowBack} alt={"Go back icon"} />
            </span>
            <h1 className={"header__headline"}>{data?.title || "?"}</h1>
          </header>
          <div className={"thumbnail-info-requirements-wrapper"}>
            <img
              src={data?.thumbnail || thumbnailPlaceholder}
              width={365}
              height={206}
              alt={"Game thumbnail"}
              className={"game-thumbnail"}
            />
            <div className={"game-information-wrapper"}>
              <h2 className={"small-title"}>Game's information:</h2>
              <div className={"game-info-wrapper"}>
                <p className={"game-info-title"}>
                  Release date:{" "}
                  <span className={"game-info-title__info"}>
                    {(data?.release_date &&
                      new Date(data?.release_date).toLocaleDateString(
                        "ru-RU",
                      )) ||
                      "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Publisher:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.publisher || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Developer:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.developer || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Genre:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.genre || "n/a"}
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
                    {data?.minimum_system_requirements?.os || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Processor:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.minimum_system_requirements?.processor || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Memory:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.minimum_system_requirements?.memory || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Graphics:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.minimum_system_requirements?.graphics || "n/a"}
                  </span>
                </p>
                <p className={"game-info-title"}>
                  Storage:{" "}
                  <span className={"game-info-title__info"}>
                    {data?.minimum_system_requirements?.storage || "n/a"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <h2 className={"small-title small-title__screenshots"}>
            Screenshots:{" "}
          </h2>
          {data?.screenshots?.length > 0 ? (
            <Carousel className={"carousel"}>
              {data?.screenshots?.map((screenshot) => {
                return (
                  <div
                    key={screenshot?.id}
                    className={"carousel__image-wrapper"}
                  >
                    <img
                      src={screenshot?.image}
                      alt={"Screenshot from the game"}
                      className={"carousel__image"}
                      width={1920}
                      height={1080}
                    />
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <p className={"screenshots-message"}>
              Screenshots are not available
            </p>
          )}
        </>
      ) : null}
    </>
  );
}
