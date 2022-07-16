import type { NextPage } from "next";
import Head from "next/head";

import Workouts from "../components/workouts";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hevy</title>
        <meta name="description" content="Hevy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Workouts />
    </div>
  );
};

export default Home;
