import Image from 'next/image';

const BetaImage = () => {
  return (
    <Image
      src="https://img.shields.io/badge/-Beta%20Feature-blue"
      alt="Beta Feature. Use at your own risk"
      title="Beta Feature. Use at your own risk"
      width={81}
      height={20}
    />
  );
};

export default BetaImage;
