import { useState } from "react";
import { useEffect } from "react";

export function MainPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts/";
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const sortAsc = () => {
    const sorted = [...data].sort((a, b) => a.title.length - b.title.length);
    setData(sorted);
  };

 

  //   console.log(data);

  return (
    <>
      <button onClick={() => {sortAsc()}}>sort</button>
      {data.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>
        </div>
      ))}
    </>
  );
}
