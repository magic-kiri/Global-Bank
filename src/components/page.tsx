import React from "react";
import Head from "next/head";

interface PageProps {
  title: string;
  children: any;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Page;
