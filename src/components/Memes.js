import React, { useState, useEffect } from "react";
import Meme from "./Meme";

const useMemes = (initial = []) => {
  const [memes, setMemes] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(({ data: { memes } }) => {
        setMemes(memes);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return [memes, error, loading];
};

const Memes = ({ history }) => {
  const [data, error, loading] = useMemes([]);
  return (
    <>
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {data.map(({ id, url, name }) => (
        <Meme
          key={id}
          url={url}
          name={name}
          onClick={() => history.push("/create", { id, url, name })}
        />
      ))}
    </>
  );
};

export default Memes;
