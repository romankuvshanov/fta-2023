import "./Games.scss";
import { Pagination, Result, Select } from "antd";
import {
  platformOptions,
  sortingOptions,
  tagsOptions,
} from "../../common/sortingOptions";
import GameCard from "../../components/GameCard/GameCard";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetGamesQuery } from "../../services/freetogame";

export default function Games() {
  const [platform, setPlatform] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("release-date");
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const { data, error, isLoading } = useGetGamesQuery({
    platform: platform,
    tag: tag,
    sort: sort,
  });

  console.log(error);

  return (
    <>
      <h1 className={"headline"}>Top Free Games for PC and Browser!</h1>
      <h2 className={"title-small"}>Sorting options</h2>
      <div className={"filters-wrapper"}>
        <div className={"filter"}>
          <span className={"filter-title"}>Platform:</span>
          <Select
            defaultValue="all"
            className={"filter__select"}
            onChange={(value) => {
              setPlatform(value);
              setPaginationInfo({ ...paginationInfo, currentPage: 1 });
            }}
            options={platformOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Genre/Tag:</span>
          <Select
            defaultValue="all"
            className={"filter__select"}
            onChange={(value) => {
              setTag(value);
              setPaginationInfo({ ...paginationInfo, currentPage: 1 });
            }}
            options={tagsOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Sort By:</span>
          <Select
            defaultValue="release-date"
            className={"filter__select"}
            onChange={(value) => {
              setSort(value);
              setPaginationInfo({ ...paginationInfo, currentPage: 1 });
            }}
            options={sortingOptions}
          />
        </div>
      </div>

      <h2 className={"title-small"}>Games:</h2>
      {isLoading && (
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
          subTitle={error?.error}
        ></Result>
      )}

      {data && (
        <div className={"games-wrapper"}>
          {data
            ?.slice(
              (paginationInfo?.currentPage - 1) * paginationInfo?.pageSize,
              paginationInfo?.currentPage * paginationInfo?.pageSize,
            )
            ?.map((game) => {
              return <GameCard gameData={game} key={game?.id} />;
            }) || <p className={"games-wrapper__no-games"}>No Games Found</p>}
        </div>
      )}

      <Pagination
        total={data?.length}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        className={"pagination"}
        onChange={(page, pageSize) =>
          setPaginationInfo({ currentPage: page, pageSize: pageSize })
        }
        current={paginationInfo?.currentPage}
        pageSize={paginationInfo?.pageSize}
        // defaultCurrent={paginationInfo?.currentPage}
        // defaultPageSize={paginationInfo?.pageSize}
      />
    </>
  );
}
