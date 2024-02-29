import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";
import cls from "classnames"

export default function card(props) {
  
  return (
    <div>
      <Link className={styles.cardLinkLink} href={props.href}>
        <div className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>

          <div className={styles.cardHeaderWrapper}>
            <p className={styles.cardHeader}>{props.name}</p>
          </div>

          <div className={styles.cardImageWrapper}>
            <Image
              src={props.imgUrl}
              className={styles.cardImage}
              alt="image"
              width={260}
              height={160}
            />
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
