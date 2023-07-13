import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import createGlobalStyle from "styled-components";

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 39px;
  border: 5px solid #888;
  background: #fff;
  height: 120px;
  margin-top: 30px;
  width: 80vw;
`;

export const Id = styled.span``;

export const Title = styled.span``;

export const Body = styled.span``;

export const Header = styled.h1`
  color: #000;
  font-family: Sofia Sans;
  font-size: 85px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 20px;
  margin-left: 20px;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
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
      <button
        onClick={() => {
          sortAsc();
        }}
      >
        sort ascending
      </button>
      <button
        onClick={() => {
          sortDsc();
        }}
      >
        sort descending
      </button>
      <button
        onClick={() => {
          setDisplay(data);
        }}
      >
        unsort
      </button>
      <Container>
        {display.map((post) => (
          <Post key={post.id}>
            <Id>{post.userId}</Id>
            <Title>{post.title}</Title>
            <Body>{post.body}</Body>
          </Post>
        ))}
      </Container>
    </>
  );
}
