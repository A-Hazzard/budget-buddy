
import Image from 'next/image';

export default function ImageWrapper({
  divClassName,
  imageClassName,
  src,
  alt,
  priority
}: {
  divClassName?: string,
  imageClassName?: string,
  src: string,
  alt: string,
  priority?: boolean,
}) {
  return (
    <div className={`mx-auto ${divClassName}`}>
      <Image
        src={src}
        alt={alt}
        width={150}
        height={150}
        loading="lazy"
        priority={priority || false}
        className={imageClassName}
      />
    </div>
  );
}
