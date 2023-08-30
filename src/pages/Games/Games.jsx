import "./Games.scss";
import { Result, Select } from "antd";
import {
  platformOptions,
  sortingOptions,
  tagsOptions,
} from "../../common/sortingOptions";
import GameCard from "../../components/GameCard/GameCard";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function Games() {
  const [platform, setPlatform] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("release-date");
  const [games, setGames] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setGames(null);

    fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&sort-by=${sort}${
        tag !== "all" ? `&category=${tag}` : ""
      }`,
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
        setGames(data);
        setError(null);
        console.log(data);
      })
      .catch((error) => {
        setError(error?.message || "Something went wrong");
        setGames(null);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [platform, sort, tag]);

  return (
    <>
      <h1 className={"headline"}>Top Free Games for PC and Browser!</h1>
      <h2 className={"title-small"}>Sorting options</h2>
      <div className={"filters-wrapper"}>
        <div className={"filter"}>
          <span className={"filter-title"}>Platform:</span>
          <Select
            defaultValue="all"
            style={{
              width: "auto",
            }}
            onChange={(value) => setPlatform(value)}
            options={platformOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Genre/Tag:</span>
          <Select
            defaultValue="all"
            style={{
              width: "auto",
            }}
            onChange={(value) => setTag(value)}
            options={tagsOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Sort By:</span>
          <Select
            defaultValue="release-date"
            style={{
              width: "100%",
            }}
            onChange={(value) => setSort(value)}
            options={sortingOptions}
          />
        </div>
      </div>

      <h2 className={"title-small"}>Games:</h2>
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
        ></Result>
      )}

      {games && (
        <div className={"games-wrapper"}>
          {games?.map((game) => {
            return <GameCard gameData={game} key={game?.id} />;
          }) || <p className={"games-wrapper__no-games"}>No Games Found</p>}
        </div>
      )}
    </>
  );
}
