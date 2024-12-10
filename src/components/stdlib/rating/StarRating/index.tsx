/* eslint-disable @typescript-eslint/no-unused-vars  */
import { useState } from 'react';
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

const Star = ({
  emptyIcon,
  filledIcon,
  halfFilledIcon,
  onRatingChange,
  onSelect,
  rating,
}: {
  emptyIcon: string;
  filledIcon: string;
  halfFilledIcon: string;
  onRatingChange: (value: number) => void;
  onSelect: () => void;
  rating: number;
}) => {
  return (
    <img
      src={
        rating < 0.5 ? emptyIcon : rating > 0.5 ? filledIcon : halfFilledIcon
      }
      className="rating-image"
      data-testid="rating-icon"
      alt="rating"
      onMouseMove={event => {
        if (isLessThanHalf(event)) {
          onRatingChange(0.5);
        } else {
          onRatingChange(1);
        }
      }}
      style={{
        width: '5rem',
        height: '5rem',
      }}
      onClick={onSelect}
    />
  );
};

const StarRating = (props: any) => {
  const [selected, onSelect] = useState(0);
  const [hover, onHover] = useState<number | null>(null);

  return (
    <div
      tabIndex={0}
      className={`star-rating ${styles.starRatingContainer}`}
      data-testid="star-rating-container"
      onClick={() => onSelect(hover == selected ? 0 : hover ?? 0)}
      onMouseLeave={() => onHover(null)}
    >
      {[1, 2, 3, 4, 5].map((rating, index) => {
        return (
          <Star
            key={index}
            rating={(hover ?? selected) - index}
            onRatingChange={(value: number) => {
              onHover(index + value);
            }}
            onSelect={() => onSelect(hover ?? 0)}
            emptyIcon={DefaultImages.emptyIcon}
            halfFilledIcon={DefaultImages.halfFilledIcon}
            filledIcon={DefaultImages.filledIcon}
          />
        );
      })}
    </div>
  );
};

const DefaultImages = {
  emptyIcon:
    'https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Facebook_svg-256.png',
  halfFilledIcon:
    'https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Pinterest2_svg-256.png',
  filledIcon:
    'https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-64.png',
};

export default StarRating;
