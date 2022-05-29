import Header from "./components/header";
import LikeCats from "./components/main/likeCats";
import AllCats from "./components/main/allCats";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import axios from "axios";

import { appStateInterface } from "./app.interface";

const dataBtn = [
  { title: "Все котики", link: "/" },
  { title: "Любимые котики", link: "/like" }
];

const App: FC = (): JSX.Element => {
  const [state, setState] = useState<appStateInterface[]>([]);
  const [likeState, setLikeState] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [stateLink, setStateLink] = useState<string>('/');

  const setLink =(link:string) => {
    setStateLink(link)
    console.log(stateLink, 'stateLink')
  }

  useEffect(() => {
    // setState(dataCats);

    const response = axios
      .get(
        `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`
      )
      .then((res) => {
        setState([...state, ...res.data]);
      });

    const myStorage = window.localStorage;

    const arrLikeCats = myStorage.getItem("likeItem");
    let newArr: string[] = [];
    if (arrLikeCats) {
      newArr = arrLikeCats.split(" ");
    }
    setLikeState(newArr);
    // myStorage.clear()
  }, [page]);

  const toolgeCats = (el: string) => {
    const myStorage = window.localStorage;

    if (likeState.includes(el)) {
      const indexIlement = likeState.indexOf(el);
      return setLikeState((prev: string[]) => {
        const newArr = [
          ...prev.slice(0, indexIlement),
          ...prev.slice(indexIlement, -1)
        ];
        const arrItems = newArr.join(" ");
        myStorage.setItem("likeItem", arrItems);
        return newArr;
      });
    }

    setLikeState((prev: string[]) => {
      const arrItems = [...prev, el].join(" ");
      myStorage.setItem("likeItem", arrItems);
      return [...prev, el];
    });
  };

  const incPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="App">
      <Router>
        <Header dataBtn={dataBtn} setLink={setLink}/>


      {stateLink === '/' ?  <AllCats
                data={state}
                toolgeCats={toolgeCats}
                load={true}
                incPage={incPage}
              /> : null}


      {stateLink === '/like' ?   <LikeCats data={likeState} toolgeCats={toolgeCats} load={false} /> : null}

        
        {/* <Routes>
          <Route
            path="/"
            element={
              <AllCats
                data={state}
                toolgeCats={toolgeCats}
                load={true}
                incPage={incPage}
              />
            }
          />
          <Route
            path="/like"
            element={
              <LikeCats data={likeState} toolgeCats={toolgeCats} load={false} />
            }
          />
        </Routes> */}
      </Router>
    </div>
  );
};

export default App;
