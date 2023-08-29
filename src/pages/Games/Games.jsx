import "./Games.scss";
import { Select } from "antd";
import {
  platformOptions,
  sortingOptions,
  tagsOptions,
} from "../../common/sortingOptions";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Games() {
  return (
    <>
      <h1>Top Free Games for PC and Browser!</h1>
      <h2>Sorting options</h2>
      <div>
        Platform:
        <Select
          defaultValue="all"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={platformOptions}
        />
      </div>
      <div>
        Genre/Tag:
        <Select
          defaultValue="all"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={tagsOptions}
        />
      </div>
      <div>
        Sort By:
        <Select
          defaultValue="release-date"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={sortingOptions}
        />
      </div>
      <h2>Games</h2>
    </>
  );
}
