import styles from './Slide.module.css';
import { CSSProperties, useMemo, useRef } from "react";
import useTargetScale from "./useTargetScale";
import classNames from "classnames";
import { CYPRESS } from "@/shared/cypress";
import Media from '../../Media/Media';

type SlideProps = {
  index: number;
  isActive: boolean;
  isPreviouslyActive: boolean;
  isCarouselVisible: boolean;
  slide: Slide;
  zIndex: number;
}

const Slide = ({ index, isActive, isPreviouslyActive, isCarouselVisible, slide, zIndex }: SlideProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const { line1, line2, media } = slide;

  const targetScale = useTargetScale({
    startSizeRef: imageRef,
    targetSizeRef: spacerRef
  });

  const slideClassNames = classNames(styles.slide, {
    [styles.isPreviouslyActive]: isPreviouslyActive && isCarouselVisible,
    [styles.isActive]: isActive && isCarouselVisible,
  });

  const primaryMedia = media.image || media.video;

  const style = {
    '--target-scale': targetScale,
    '--aspect-ratio': `${primaryMedia.width} / ${primaryMedia.height}`,
    '--z-index': zIndex,
  } as CSSProperties

  const cyAttribute = useMemo(() => {
    if (isActive) {
      return CYPRESS.SLIDE_ACTIVE;
    }
    if (isPreviouslyActive) {
      return CYPRESS.SLIDE_PREV;
    }
    return CYPRESS.SLIDE;
  }, [isActive, isPreviouslyActive]);

  return (
    <li className={slideClassNames} data-cy={cyAttribute} data-cy-index={index} style={style}>
      <Media
        className={styles.media}
        media={media}
        isActive={isActive && isCarouselVisible}
        ref={imageRef}
      />
      <div className={styles.imageSpacer} ref={spacerRef} />
      <div className={styles.title}>
        <p className={styles.content}>
          {line1 && <>{line1}<br /></>}
          {line2 && <>{line2}<br /></>}
        </p>
      </div>
    </li>
  );
}

export default Slide;