import React from 'react';

interface CardMediaProps {
  image: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
}

const CardMedia = ({ image, width, height, alt = '' }: CardMediaProps) => {
  return (
    <img
      className="rounded-t-lg bg-cover bg-no-repeat bg-center w-full object-cover"
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
      src={image}
      alt={alt}
    />
  );
};

export default CardMedia;
