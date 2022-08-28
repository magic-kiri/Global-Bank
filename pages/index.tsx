import React from "react";
import HomeBody from "../src/components/HomeBody";
import Page from "../src/components/page";
import 'antd/dist/antd.css';

function Home() {
  return (
    <Page title="ব্যাংক">
      <HomeBody />
    </Page>
  );
}
Home.auth = false;
export default Home;