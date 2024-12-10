/* eslint-disable */

import StarRating from '@components/stdlib/rating/StarRating';

// @ts-nocheck
function Playground() {
  const value = 'Surprise!';

  function f() {
    const value = 'the closest value';

    function g() {
      alert('A'); // in console: type alert(value); Surprise!
    }

    return g;
  }

  let g = f();
  g();

  return (
    <div>
      <StarRating />
    </div>
  );
}

export default Playground;
