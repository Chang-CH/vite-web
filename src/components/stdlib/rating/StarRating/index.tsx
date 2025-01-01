/* eslint-disable @typescript-eslint/no-unused-vars  */
import { useEffect, useState } from 'react';
import styles from './s.module.scss';

// Utility function to calculate if the mouse event happened on the left side of the target or the right side.
// @ts-expect-error copy paste JS test case from OA
const isLessThanHalf = event => {
  const { target } = event;
  const boundingClientRect = target.getBoundingClientRect();
  let mouseAt = event.clientX - boundingClientRect.left;
  mouseAt = Math.round(Math.abs(mouseAt));
  return mouseAt <= boundingClientRect.width / 2;
};

enum State {
  EMPTY,
  HALF_FILLED,
  FILLED,
}

const Star = ({
  steps,
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  onRatingChange,
  onSelect,
  rating,
}: {
  steps: number;
  emptyIcon: string;
  filledIcon: string;
  halfFilledIcon: string;
  onRatingChange: (value: number) => void;
  onSelect: (amount: number) => void;
  rating: number;
}) => {
  const [icon, setIcon] = useState(emptyIcon);

  useEffect(() => {
    if (rating <= 0) {
      setIcon(emptyIcon);
    } else if (rating >= 1) {
      setIcon(filledIcon);
    } else if (rating > 0) {
      setIcon(halfFilledIcon);
    }
  }, [rating]);

  return (
    <img
      src={icon}
      className="rating-image"
      data-testid="rating-icon"
      alt="rating"
      onMouseMove={event => {
        if (isLessThanHalf(event) && steps < 1) {
          onRatingChange(0.5);
        } else {
          onRatingChange(1);
        }
      }}
      style={{
        width: '5rem',
        height: '5rem',
      }}
      onClick={event => {
        if (isLessThanHalf(event) && steps < 1) {
          onSelect(0.5);
        } else {
          onSelect(1);
        }
      }}
    />
  );
};

const StarRating = ({
  steps,
  value,
  halfFilledIcon,
  filledIcon,
  emptyIcon,
}: {
  steps?: number;
  value?: number;
  halfFilledIcon?: string;
  filledIcon?: string;
  emptyIcon?: string;
}) => {
  const [selected, onSelect] = useState(value ?? 0);
  const [hover, onHover] = useState<number | null>(null);

  useEffect(() => {
    onSelect(value ?? 0);
  }, [value]);

  return (
    <div
      tabIndex={0}
      className={`star-rating ${styles.starRatingContainer}`}
      data-testid="star-rating-container"
      onMouseLeave={() => onHover(null)}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') {
          onSelect(Math.max(0, selected - (steps ?? 1)));
        }

        if (e.key === 'ArrowRight') {
          onSelect(Math.min(5, selected + (steps ?? 1)));
        }

        if (!isNaN(parseFloat(e.key))) {
          onSelect(Math.min(5, Math.max(0, parseInt(e.key))));
        }
      }}
    >
      {[1, 2, 3, 4, 5].map((rating, index) => {
        return (
          <Star
            key={index}
            rating={(hover ?? selected) - index}
            onRatingChange={(val: number) => {
              onHover(index + val);
            }}
            steps={steps ?? 1}
            onSelect={val => {
              onSelect(index + val === selected ? 0 : index + val);
            }}
            emptyIcon={emptyIcon ?? RatingDefaultImages.emptyIcon}
            halfFilledIcon={
              halfFilledIcon ?? RatingDefaultImages.halfFilledIcon
            }
            filledIcon={filledIcon ?? RatingDefaultImages.filledIcon}
          />
        );
      })}
    </div>
  );
};

export const RatingDefaultImages = {
  emptyIcon:
    'https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Facebook_svg-256.png',
  halfFilledIcon:
    'https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Pinterest2_svg-256.png',
  filledIcon:
    'https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-64.png',
};

export default StarRating;
