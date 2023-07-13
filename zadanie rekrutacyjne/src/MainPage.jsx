import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./Styles/MainPageStyled";
import { LineContainer } from "./Styles/MainPageStyled";
import { Line } from "./Styles/MainPageStyled";
import { SortContainer } from "./Styles/MainPageStyled";
import { SortBy } from "./Styles/MainPageStyled";
import { SortingButton } from "./Styles/MainPageStyled";
import { CancelButton } from "./Styles/MainPageStyled";
import { PostsContainer } from "./Styles/MainPageStyled";
import { Post } from "./Styles/MainPageStyled";
import { TopSection } from "./Styles/MainPageStyled";
import { Title } from "./Styles/MainPageStyled";
import { TitleTxt } from "./Styles/MainPageStyled";
import { Id } from "./Styles/MainPageStyled";
import { IdTxt } from "./Styles/MainPageStyled";
import { PostLine } from "./Styles/MainPageStyled";
import { Body } from "./Styles/MainPageStyled";


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
