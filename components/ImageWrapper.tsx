import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className={`mx-auto ${divClassName}`} ref={ref}>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={controls}
        whileHover="hover"
        whileTap="tap"
      >
        <Image
          src={src}
          alt={alt}
          width={150}
          height={150}
          loading={`${!priority ? 'lazy' : 'eager'}`}
          priority={priority || false}
          className={imageClassName}
        />
      </motion.div>
    </div>
  );
}
