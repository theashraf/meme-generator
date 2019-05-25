import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Meme from "./Meme";

const useText = (initial = "") => {
  const [text, setText] = useState(initial);
  return [text, setText];
};

const CreateMeme = ({ location: { state: template }, history }) => {
  const [text0, setText0] = useText("");
  const [text1, setText1] = useText("");
  const [meme, setMeme] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setText0("");
    setText1("");
  };

  useEffect(() => {
    if (meme) {
      history.push("/generated", { url: meme });
    }
  }, [meme]);

  if (!template) history.push("/");

  return (
    <>
      {template ? (
        <>
          <Meme url={template.url} name={template.name} />
          {!loading ? (
            <form
              onSubmit={e => {
                e.preventDefault();

                setLoading(true);
                resetForm();

                const data = {
                  username: "xoxa",
                  password: "xoxaxoxa",
                  template_id: template.id,
                  text0,
                  text1
                };

                fetch("https://api.imgflip.com/caption_image", {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8"
                  },
                  body: Object.keys(data)
                    .map(key => {
                      return (
                        encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(data[key])
                      );
                    })
                    .join("&")
                })
                  .then(res => res.json())
                  .then(({ data: { url } }) => {
                    setLoading(false);
                    setMeme(url);
                  })
                  .catch(error => {
                    setLoading(false);
                    alert(error.message);
                  });
              }}
            >
              <input
                name="text0"
                id="text0"
                placeholder="Enter Top Text ..."
                value={text0}
                onChange={e => setText0(e.target.value)}
              />
              <br />
              <input
                name="text1"
                id="text1"
                placeholder="Enter Bottom Text ..."
                value={text1}
                onChange={e => setText1(e.target.value)}
              />
              <br />
              <button type="submit">Generate</button>
            </form>
          ) : (
            <p>loading...</p>
          )}
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default CreateMeme;
