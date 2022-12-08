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
              });
              // create a session
              const session = await createSession({
                ticket:
                  "e60ffc6c1a0cc8af05788aaf66eec98581d860b3f35b469ce80ca56741954771d05be351b98a7ae12f925f88cda20629e44f57c272a0791e93cad2321720e2a3dbcc8e10a7458e7ffbe24a7e1180a2e399311f7375ebd2a09b028e0ab83309a5a2d05fcb97dc85-fd1fefb4f725a06e225c259efe0eb813",
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
        </div>
      </div>
        
        <div className={styles.canvasContainer}>
            <canvas className={styles.canvas} id="canvas"></canvas>
        </div>


    </div>
  );
}
