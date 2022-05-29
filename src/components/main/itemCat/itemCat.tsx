import styles from "./itemCat.module.scss";
import { ReactComponent as ReactLike } from "./like.svg";
import { ReactComponent as ReactLikeFull } from "./likeFull.svg";
import cn from "classnames";
import itemCatInterface from "./itemCat.interface";
import { FC } from "react";

const ItemCat:FC<itemCatInterface> = ({ item, toolgeCats, load }): JSX.Element=> {
  return (
    <div className={styles.itemCat}>
      <img src={item && item} alt="котятка" />
      <div className={styles.like} onClick={() => toolgeCats(item)}>
        <ReactLike className={styles.likeBig} />
        <ReactLikeFull
          className={cn(styles.likeFull, {
            [styles.likeTouch]: !load
          })}
        />
      </div>
    </div>
  );
};
export default ItemCat;
