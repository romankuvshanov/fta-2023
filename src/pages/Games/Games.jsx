import "./Games.scss";
import { Button, Pagination, Result, Select } from "antd";
import {
  platformOptions,
  sortingOptions,
  tagsOptions,
} from "../../common/sortingOptions";
import GameCard from "../../components/GameCard/GameCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetGamesQuery } from "../../services/freetogame";
import { useSearchParams } from "react-router-dom";

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams({
    platform: "all",
    tag: "all",
    sort: "release-date",
    currentPage: "1",
    pageSize: "10",
  });

  const platform = searchParams.get("platform");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort");
  const currentPage = searchParams.get("currentPage");
  const pageSize = searchParams.get("pageSize");

  const { data, error, isFetching, refetch  } = useGetGamesQuery({
    platform: platform,
    tag: tag,
    sort: sort,
  });

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
            value={platform}
            onChange={(value) => {
              searchParams.set("platform", value);
              searchParams.set("currentPage", "1");
              setSearchParams(searchParams);
            }}
            options={platformOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Genre/Tag:</span>
          <Select
            defaultValue="all"
            className={"filter__select"}
            value={tag}
            onChange={(value) => {
              searchParams.set("tag", value);
              searchParams.set("currentPage", "1");
              setSearchParams(searchParams);
            }}
            options={tagsOptions}
          />
        </div>
        <div className={"filter"}>
          <span className={"filter-title"}>Sort By:</span>
          <Select
            defaultValue="release-date"
            className={"filter__select"}
            value={sort}
            onChange={(value) => {
              searchParams.set("sort", value);
              searchParams.set("currentPage", "1");
              setSearchParams(searchParams);
            }}
            options={sortingOptions}
          />
        </div>
      </div>

      <h2 className={"title-small"}>Games:</h2>
      {error ? (
        <Result
          className={"error"}
          status="error"
          title="Submission Failed"
          subTitle={error?.error}
          extra={
            <Button type="primary" onClick={() => refetch() }>
              Try Again
            </Button>
          }
        ></Result>
      ) : isFetching ? (
        <div className={"loading"}>
          <LoadingOutlined className={"loading__icon"} />
          <p className={"loading__message"}>Loading... Please, wait</p>
        </div>
      ) : data ? (
        <>
          <div className={"games-wrapper"}>
            {data
              ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
              ?.map((game) => {
                return <GameCard gameData={game} key={game?.id} />;
              }) || <p className={"games-wrapper__no-games"}>No Games Found</p>}
          </div>
          <Pagination
            total={data?.length}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            className={"pagination"}
            onChange={(page, pageSize) => {
              searchParams.set("pageSize", pageSize.toString());
              searchParams.set("currentPage", page.toString());
              setSearchParams(searchParams);
            }}
            current={+currentPage}
            pageSize={+pageSize}
            // defaultCurrent={paginationInfo?.currentPage}
            // defaultPageSize={paginationInfo?.pageSize}
          />
        </>
      ) : null}
    </>
  );
}
