import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';
import _ from 'lodash';

function intent(DOM) {
  return {
    pixel$: DOM
      .select('.pixel')
      .events('mouseover')
      .map(ev => {
        return (ev.buttons === 1) ?
          {num: Number(ev.target.id), color: 'blue'} : null
      })
  }
}

function model(actions) {
  const pixelInit = _.map(
    _.range(1, 1601),
    x => ({num: x, color: 'white'})
  )

  return actions.pixel$
    .startWith(pixelInit)
    .scan((x, y) => {
      if(y === null) {
        return x
      }
      return _.sortBy(_.uniq(_.union(x, [y]).reverse(), 'num'), 'num')
    })
}

function renderPixels(pixelData) {
  return pixelData.map(pixel => {
    return h('div#' + pixel.num + '.pixel', {style: {'background': pixel.color}}, '')
  })
}

function view(state$) {
  return state$.distinctUntilChanged().map((pixels) => {
    return h('div.container', renderPixels(pixels))
  })
}

function main({DOM}) {
  return {DOM: view(model(intent(DOM)))};
};

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
