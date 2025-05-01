/* eslint-disable */
// @ts-nocheck

import CssVariableBenchmark from '@pages/benchmark/cssVariables';
import Module from './calc.js';

function Playground() {
  const calc = Module().then(x => {
    console.log('get', x._get());
    console.log('add', x._add(4));
    console.log('get', x._get());
    console.log('sub', x._sub(1));
    console.log('get', x._get());
    console.log('mul', x._mul(2));
    console.log('get', x._get());
    console.log('div', x._div(2));
    console.log('get', x._get());
    console.log('end');
  });
  return (
    <div>
      <CssVariableBenchmark />
    </div>
  );
}

export default Playground;
