import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import cls from "classnames";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  console.log(coffeeStore);
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; // dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function coffeeStore(props) {
  const router = useRouter();
  console.log("router", router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, region, name, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("Clicked");
  };

  console.log(props);
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <p className="backToHome">← Back to home</p>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{props.name}</h1>
          </div>
          <div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={props.coffeeStore.name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width={24}
                height={24}
                alt={""}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}

          {region && (
            
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt={""}
            />
            <p className={styles.text}>{region}</p>
          </div>
          )}
         
          <div className={styles.iconWrapper}>
            <Image
              src="../static/icons/star.svg"
              width={24}
              height={24}
              alt={""}
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote !
          </button>
        </div>
      </div>
    </div>
  );
}
