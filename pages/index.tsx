import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { createViewport, createSession } from "@shapediver/viewer";

export default function Home() {
    useEffect(() => {
        const loadShapediver = async () => {
            const viewport = await createViewport({
                canvas: document.getElementById("canvas") as HTMLCanvasElement,
                id: "myViewport",
                branding: {
                  logo: "https://iili.io/HnaqKaR.png",
                  backgroundColor: "#000000"
                }
              });
              // create a session
              const session = await createSession({
                ticket:
                  "a55628b5ccd16762870d14a6b168bea5406430694548998adf76678109dc658425c26671339b29e8d8688fe65757e3a3e117d55b60f63e0c73fe02ffd1e1e402d3b2173b163dd6e20782b6ea7d162d32e411e01101d6ce48c137c0a7e4f9e95b3d2c8cec128aec-a5cb37cb7caefba26adf6519b71ace17",
                modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
                id: "mySession",
              });
            
              // read out the parameter with the specific name
              const lengthParameter = session.getParameterByName("Length")[0];
            
              // update the value
              lengthParameter.value = 6;
            
              // and customize the scene
              await session.customize();
        }
        loadShapediver();
    }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Manglar Madre Design Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <div className={styles.title}>
          Welcome to <a href="https://en.wikipedia.org/wiki/Tulum">Manglar Madre</a>
        </div>``
      </div>
        
        <div className={styles.canvasContainer}>
            <canvas className={styles.canvas} id="canvas"></canvas>
        </div>

        <iframe className ="airtable-embed" src="https://airtable.com/embed/shro4GR1nFfRnqvqf?backgroundColor=blue"></iframe>


    </div>
  );
}
