import React from "react";

const Meme = ({ url, name, onClick }) => (
  <img src={url} width="250px" alt={name} onClick={onClick} />
);

export default Meme;
