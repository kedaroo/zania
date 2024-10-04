import React, { useState } from "react";

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loader?: React.ReactNode;
}

export default function Image({ loader, ...imgProps }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <img
        {...imgProps}
        style={{ ...imgProps.style, display: loading ? "none" : "unset" }}
        onLoad={handleImageLoad}
      />
      {loading && <div className="loader">{loader || "Loading..."}</div>}
    </>
  );
}
