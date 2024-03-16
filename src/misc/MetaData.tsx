import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Config from "../config/Config";

const MetaData = ({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description?: string;
  image?: string | Array<string>;
  url?: string;
}): React.ReactElement => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? title + " | Flipper" : "Flipper"}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={description} />
        <meta property="og:url" content={`${Config.HOST}/#/${url}`} />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content={"Flipper"} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        {Array.isArray(image) ? (
          image.map((uri) => (
            <meta property="og:image" content={uri} key={uri} />
          ))
        ) : (
          <meta property="og:image" content={image} key={image} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={Config.SOCIALS.twitter.url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={Config.HOST} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@flipper" />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
