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
  
  console.log(data);

  return <span>witam</span>;
}
