// import axios from "axios";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { tmdbAxios } from "../../api/tmdb";
import ContentItem from "./ContentItem";

function ContentList({ title, initialState }) {
  //
  const [filters, setFilters] = useState(initialState);
  const [items, setItems] = useState([]);

  const handleToggle = (id) => {
    setFilters(
      filters.map((filter) =>
        // 클릭한 대상은 무조건 active를 true로, 나머지는 무조건 false로
        filter.id === id
          ? { ...filter, active: true }
          : { ...filter, active: false }
      )
    );
  };

  const fetchData = async (url) => {
    const { data } = await tmdbAxios.get(url);

    const { results } = data;
    setItems(results);
  };

  useEffect(() => {
    const { url } = filters.find((filter) => filter.active);
    fetchData(url);
  }, [filters]);

  console.log(items);

  return (
    <div>
      <Container>
        <ContentHeader>
          <h3>{title}</h3>
          <FilterList>
            {filters.map((filter) => (
              <FilterItem
                key={filter.id}
                active={filter.active}
                onClick={() => handleToggle(filter.id)}
              >
                {filter.text}
              </FilterItem>
            ))}
          </FilterList>
        </ContentHeader>

        <ContentWrapper>
          {/* 실제 데이터 반영해서 제목만 출력하기 */}
          {items.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </ContentWrapper>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding: 20px;
  img {
    width: 200px;
  }
`;
const ContentHeader = styled.div`
  display: flex;
`;

const FilterList = styled.ul`
  display: flex;
  border: 1px solid #000;
  margin-left: 20px;
`;

const FilterItem = styled.li`
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  ${({ active }) =>
    active &&
    css`
      background-color: #000;
      color: #fff;
    `}
`;
const ContentWrapper = styled.ul`
  display: flex;
  padding: 20px 0;
  overflow-x: auto;
  gap: 20px;
`;

export default ContentList;
