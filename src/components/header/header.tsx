import { FC } from "react";
import Btn from "./btn";
import styles from "./header.module.scss";
import { headerInterface } from "./heder.interface";

const Header: FC<headerInterface> = ({ dataBtn, setLink }): JSX.Element => {
  return (
    <div className={styles.header}>
      {dataBtn.map(({ title, link }, id) => (
        <Btn title={title} key={id} link={link} setLink={setLink}/>
      ))}
    </div>
  );
};
export default Header;
