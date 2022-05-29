import Header from "./components/header";
import LikeCats from "./components/main/likeCats";
import AllCats from "./components/main/allCats";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import axios from "axios";

import { appStateInterface } from "./app.interface";

//data-testing no-production-no!
const dataCats: appStateInterface[] = [
  {
    breeds: [],
    id: "2d8",
    url: "https://cdn2.thecatapi.com/images/2d8.jpg",
    width: 3264,
    height: 2448
  },
  {
    breeds: [],
    id: "2ds",
    url: "https://cdn2.thecatapi.com/images/2ds.jpg",
    width: 485,
    height: 402
  },
  {
    breeds: [],
    id: "5pd",
    url: "https://cdn2.thecatapi.com/images/5pd.jpg",
    width: 400,
    height: 600
  },
  {
    breeds: [],
    categories: [
      {
        id: 14,
        name: "sinks"
      }
    ],
    id: "8o4",
    url: "https://cdn2.thecatapi.com/images/8o4.jpg",
    width: 960,
    height: 720
  },
  {
    breeds: [],
    id: "aa9",
    url: "https://cdn2.thecatapi.com/images/aa9.jpg",
    width: 500,
    height: 375
  },
  {
    breeds: [],
    id: "av2",
    url: "https://cdn2.thecatapi.com/images/av2.jpg",
    width: 428,
    height: 629
  },
  {
    breeds: [],
    id: "dc1",
    url: "https://cdn2.thecatapi.com/images/dc1.gif",
    width: 300,
    height: 225
  },
  {
    breeds: [],
    id: "TTs20fiXX",
    url: "https://cdn2.thecatapi.com/images/TTs20fiXX.jpg",
    width: 1600,
    height: 1200
  },
  {
    breeds: [],
    id: "h-phiJHDP",
    url: "https://cdn2.thecatapi.com/images/h-phiJHDP.png",
    width: 2232,
    height: 1920
  },
  {
    breeds: [],
    id: "0UduF9VWT",
    url: "https://cdn2.thecatapi.com/images/0UduF9VWT.jpg",
    width: 1000,
    height: 800
  }
];

const dataBtn = [
  { title: "Все котики", link: "/" },
  { title: "Любимые котики", link: "/like" }
];

const App: FC = (): JSX.Element => {
  const [state, setState] = useState<appStateInterface[]>([]);
  const [likeState, setLikeState] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

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
        <Header dataBtn={dataBtn} />
        <Routes>
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
