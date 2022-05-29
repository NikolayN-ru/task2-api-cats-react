import { FC } from "react";
import ItemCat from "../itemCat";
import allCatsInterface from "./allCats.interface";
import styles from "./allCats.module.scss";

const AllCats:FC<allCatsInterface> = ({ data, toolgeCats, load, incPage }): JSX.Element=> {
  return (
    <>
      <div className={styles.allCats}>
        {data &&
          data.map((item: any, id: number) => (
            <ItemCat
              item={item.url}
              key={id}
              toolgeCats={toolgeCats}
              load={load}
            />
          ))}
      </div>
      {load && (
        <div className={styles.loaded} onClick={() => incPage()}>
          ... загружаем еще котиков ...
        </div>
      )}
    </>
  );
};
export default AllCats;
