import React from "react";
import Meme from "./Meme";

const GeneratedMeme = ({ history, location: { state: meme } }) => {
  if (!meme) history.push("/");

  return (
    <>
      {meme && (
        <>
          <h1>Generated Meme</h1>
          <a href={meme.url} download>
            <Meme url={meme.url} name="my meme" />
          </a>
          <button onClick={() => history.push("/")}>Create another</button>
        </>
      )}
    </>
  );
};

export default GeneratedMeme;
