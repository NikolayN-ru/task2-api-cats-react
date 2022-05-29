import { FC } from "react";
import ItemCat from "../itemCat";
import likeCatsInterface from "./likeCats.interface";
import styles from "./likeCats.module.scss";


const LikeCats:FC<likeCatsInterface> = ({ data, toolgeCats, load }): JSX.Element=> {
  return (
    <div className={styles.likeCats}>
      {data.length ? (
        data.map((item: any, id: number) => (
          <ItemCat item={item} key={id} toolgeCats={toolgeCats} load={load} />
        ))
      ) : (
        <p>любимых котиков нет</p>
      )}
    </div>
  );
};
export default LikeCats;
