import { FC } from "react";
import Btn from "./btn";
import styles from "./header.module.scss";
import { headerInterrface } from "./heder.interface";

const Header: FC<headerInterrface> = ({ dataBtn }): JSX.Element => {
  return (
    <div className={styles.header}>
      {dataBtn.map(({ title, link }, id) => (
        <Btn title={title} key={id} link={link} />
      ))}
    </div>
  );
};
export default Header;
