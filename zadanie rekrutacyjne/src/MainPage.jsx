import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 39px;
  border: 5px solid #888;
  background: #fff;
  min-height: 120px;
  margin-top: 30px;
  width: 80vw;
  justify-content: flex-start;
  align-items: center;
  font-family: Sofia Sans;
`;

export const Id = styled.span``;

export const Title = styled.span``;

export const Body = styled.span`
  padding-left: 20px;
  justify-self: flex-start;
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const Header = styled.h1`
  color: #000;
  font-family: Sofia Sans;
  font-size: 85px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 20px;
  margin-left: 50px;
  margin-bottom: 20px;
  @media (prefers-color-scheme: dark) {
    color: #dbd7c9;
  }
`;

export const PostsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export const Line = styled.div`
  width: 95%;
  height: 1px;
  background-color: black;
  @media (prefers-color-scheme: dark) {
    background-color: #dbd7c9;
  }
`;

export const LineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SortContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 45px;
`;

export const SortBy = styled.span`
  color: #737373;
  font-family: Sofia Sans;
  font-size: 55px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SortingButton = styled.button`
  width: 200px;
  height: 60px;
  border-radius: 100px;
  background: #3e3e3e;
  border: none;
  color: #dbd7c9;
  font-family: Sofia Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  transition: 0.5s;
  &:hover {
    background-color: #dbd7c9;
    color: #3e3e3e;
    border-style: solid;
    border-width: 5px;
    border-color: #3e3e3e;
    cursor: pointer;
  }
`;

export const CancelButton = styled.button`
  color: #f00;
  font-family: Sofia Sans;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: none;
  border: none;
  margin-left: 30px;
  transition: 0.5s;
  &:hover {
    color: #4d0000;
    cursor: pointer;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
`;

export const IdTxt = styled.span`
  margin-right: 20px;
  font-weight: 700;
`;

export const TitleTxt = styled.span`
  margin-right: 20px;
  font-weight: 700;
`;

export const PostLine = styled.div`
  height: 1px;
  background-color: black;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export function MainPage() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts/";
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
        setDisplay(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const sortAsc = () => {
    const sorted = [...data].sort((a, b) => a.title.length - b.title.length);
    setDisplay(sorted);
  };

  const sortDsc = () => {
    const sorted = [...data].sort((a, b) => b.title.length - a.title.length);
    setDisplay(sorted);
  };

  return (
    <>
      <Header>Archieve of The Blog</Header>
      <LineContainer>
        <Line />
      </LineContainer>
      <SortContainer>
        <SortBy>Sort By:</SortBy>
        <SortingButton
          onClick={() => {
            sortDsc();
          }}
        >
          Most interesting
        </SortingButton>
        <SortingButton
          onClick={() => {
            sortAsc();
          }}
        >
          Least interesting
        </SortingButton>
        <CancelButton
          onClick={() => {
            setDisplay(data);
          }}
        >
          Cancel
        </CancelButton>
      </SortContainer>
      <PostsContainer>
        {display.map((post) => (
          <Post key={post.id}>
            <TopSection>
              <div>
                <TitleTxt>TITLE:</TitleTxt>
                <Title>{post.title}</Title>
              </div>
              <div>
                <IdTxt>USER ID:</IdTxt>
                <Id>{post.userId}</Id>
              </div>
            </TopSection>
            <PostLine />
            <Body>{post.body}</Body>
          </Post>
        ))}
      </PostsContainer>
    </>
  );
}
