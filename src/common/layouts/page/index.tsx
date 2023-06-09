import React from "react";
import Head from "next/head";
import { Brand } from "@constants/.";
import ConditionalWrapper from "@components/ConditionalWrapper";
import Navbar from "@components/NavBar";

export type Props = {
  title?: string;
  titlePrefix?: string;
  titleSuffix?: string;
  description?: string;
  navbar?: boolean;
  container?: boolean;
  children?: React.ReactNode;
};

const Page: React.FC<Props> = ({
  title = Brand.name,
  titlePrefix = "",
  description = Brand.description,
  navbar = true,
  container = true,
  children,
}) => {
  return (
    <>
      <Head>
        <title>
          {titlePrefix} {title}
        </title>
        <meta name="description" content={description} />
        <link rel="icon" href="https://res.cloudinary.com/di9zvktdc/image/upload/v1682476848/ShopZen/shopZen-miniLogo.png" />
      </Head>

      {navbar && <Navbar />}

      <ConditionalWrapper
        condition={container}
        wrapper={(children) => (
          <main className="container p-4 mx-auto">{children}</main>
        )}
      >
        {children}
      </ConditionalWrapper>
    </>
  );
};

export default Page;
