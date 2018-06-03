import * as R from 'ramda';

export const findBy = R.curry(
  (prop, val, list) => R.find(R.propEq(prop, val), list),
);

export const findVertex = R.curry(
  (key, graph) => findBy('key', key, graph.vertices),
);

export const appendVertices = R.curry(
  (vertices, graph) => R.evolve(
    {
      vertices: R.concat(
        R.map(
          R.unless(R.has('key'), R.objOf('key')),
          vertices,
        ),
      ),
    },
    graph,
  ),
);

export const appendVertex = R.curry(
  (key, data, graph) => R.evolve(
    {
      vertices: R.append({key, ...data}),
    },
    graph,
  ),
);

