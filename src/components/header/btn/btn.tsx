import styles from "./btn.module.scss";
import { FC } from "react";
import btnInteface from "./btn.interface";
import { Link } from "react-router-dom";

const Btn: FC<btnInteface> = ({ title, link }): JSX.Element => {
  return (
    <div className={styles.btn}>
      <Link to={link}>{title}</Link>
    </div>
  );
};
export default Btn;
