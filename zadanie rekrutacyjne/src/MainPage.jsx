import { useState } from "react";
import { useEffect } from "react";

export function MainPage() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([])

  useEffect(() => {
    const getData = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts/";
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
        setDisplay(data)
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
      <button onClick={() => {sortAsc()}}>sort ascending</button>
      <button onClick={() => {sortDsc()}}>sort descending</button>
      <button onClick={() => {setDisplay(data)}}>unsort</button>
      {display.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>
        </div>
      ))}
    </>
  );
}
