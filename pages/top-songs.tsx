import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const response = await fetch(
    "http://localhost:3000/spotify-me/api/top-songs"
  );
  const songs = await response.json();

  return {
    props: songs,
  };
}

type Song = {
  artist: string,
  songUrl: string,
  title: string,
  album: string,
  image: string
}


// TODO: Each child in a list should have a unique "key" prop.
const renderSong = (song: Song) => {
  return (
    // TODO: Song url doesn't open in app :'(
    <a href={song.songUrl} className={styles.card}>
      <section>
        <div>
          <img src={song.image} alt=""/>
        </div>
        <div>
          <h3>{song.title}</h3>
          <p>{song.album}</p>
          <p>{song.artist}</p>
        </div>
      </section>
    </a>
  )
}

const Home = ({ songs }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Youri's Top Songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Top Songs</h1>

        <p className={styles.description}>
          Thanks for stopping by—here are my top 20 songs :)
        </p>

        <section className={styles.grid}>
          {/* Render each song */}
          {songs.map((song: Song) => {
            return renderSong(song);
          })}
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
