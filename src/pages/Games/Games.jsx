import "./Games.scss";
import { Select } from "antd";
import {
  platformOptions,
  sortingOptions,
  tagsOptions,
} from "../../common/sortingOptions";
import GameCard from "../../components/GameCard/GameCard";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Games() {
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            options={sortingOptions}
          />
        </div>
      </div>

      <h2 className={"title-small"}>Games:</h2>
        <GameCard />
    </>
  );
}
