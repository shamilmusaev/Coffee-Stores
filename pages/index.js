import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

export async function getStaticProps() {

  const coffeeStores = await fetchCoffeeStores()

  return {
    props: {
       coffeeStores,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  const handleOnBannerBtnClick = () => {
    console.log("Hi banner button");
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} `}>
        <Banner
          buttonText="Enjoy Coffee stores nearby"
         
        />

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            priority={true}
            alt="hero-image"
            width={700}
            height={400}
          />
        </div>

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stockholm Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
