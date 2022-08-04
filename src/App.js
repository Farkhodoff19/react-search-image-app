import React, { useState } from "react";
import axios from "axios";
import { SRLWrapper } from "simple-react-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";

const App = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const key = "QiAJGvwZvJTxm3ssyMCqqia7Q-_6PjcSLRJE4YtMi4U";

  const getValue = (e) => {
    setImage(e.target.value);
  };

  const getImg = () => {
    const urlAPI =
      "https://api.unsplash.com/search/photos?page=1&query=" +
      image +
      "&client_id=" +
      key;
    axios.get(urlAPI).then((response) => {
      setResult(response.data.results);
    });
  };

  return (
    <SRLWrapper>
      <>
        <h1 className="title">📷 React Image Search with Unsplash API</h1>
        <div className="formSection">
          <input
            type="text"
            name="image"
            placeholder="Search picture..."
            onChange={getValue}
          />
          <button onClick={getImg} type="submit">
            Search
          </button>
        </div>

        <div className="result">
          {result.map((image, id) => (
            <div className="card" key={image.id}>
              <a>
                <LazyLoadImage
                  className="resultImage"
                  src={image.urls.full}
                  effect="blur"
                  delayTime="300"
                />
                <p>Photo by {image.user.name}</p>
              </a>
            </div>
          ))}
        </div>
      </>
    </SRLWrapper>
  );
};

export default App;
