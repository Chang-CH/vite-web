/* eslint-disable @typescript-eslint/no-unused-vars  */
// @ts-expect-error copy paste JS test case from OA
const StarRating = props => {
  const _emptyIcon = '/icons/stars/empty.svg';
  const _filledIcon = '/icons/stars/filled.svg';
  const _halfFilledIcon = '/icons/stars/half.svg';

  // Utility function to calculate if the mouse event happened on the left side of the target or the right side.
  // @ts-expect-error copy paste JS test case from OA
  const isLessThanHalf = event => {
    const { target } = event;
    const boundingClientRect = target.getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt <= boundingClientRect.width / 2;
  };

  const renderSymbol = () => {
    return (
      <img
        src=""
        className="rating-image"
        data-testid="rating-icon"
        alt="Rate"
      />
    );
  };

  return (
    <div
      tabIndex={0}
      className="star-rating"
      data-testid="star-rating-container"
    >
      {renderSymbol()}
    </div>
  );
};

export default StarRating;
