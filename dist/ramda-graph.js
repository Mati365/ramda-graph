'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var R = require('ramda');

var _graph = (undirected = true) => ({
  edges: [], // e.g. [{v1: 'A', v2: 'B', weight: 2, data: {}} ... ]
  vertices: [], // list of vertices, all must have key attribute e.g. [{key: 'aa'..}, ..]
  undirected,
});

const findBy = R.curry(
  (prop, val, list) => R.find(R.propEq(prop, val), list),
);

const findVertex = R.curry(
  (key, graph) => findBy('key', key, graph.vertices),
);

const appendVertices = R.curry(
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

const appendVertex = R.curry(
  (key, data, graph) => R.evolve(
    {
      vertices: R.append({key, ...data}),
    },
    graph,
  ),
);

/** reorders to v1 that is always source */
const __makeEdgeSource = sourceVertex => R.unless(
  R.isNil,
  edge => ({
    ...edge,
    v1: sourceVertex,
    v2: edge.v2 === sourceVertex ? edge.v1 : edge.v2,
  }),
);

const __edgeComparator = (undirected, v1, v2) => (
  undirected
    ? ({v1: e1, v2: e2}) => ((e1 === v1 && e2 === v2) || (e1 === v2 && e2 === v1))
    : ({v1: e1, v2: e2}) => (v1 === e1 && v2 === e2)
);

const updateEdge = R.curry(
  (v1, v2, newData, graph) => {
    const index = R.findIndex(
      __edgeComparator(graph.undirected, v1, v2),
      graph.edges,
    );

    return {
      ...graph,
      edges: R.update(index, newData, graph.edges),
    };
  },
);

const findEdge = R.curry(
  (v1, v2, graph) => R.find(
    __edgeComparator(graph.undirected, v1, v2),
    graph.edges,
  ),
);

const findEdges = R.curry(
  (v1, graph) => R.compose(
    R.map(__makeEdgeSource(v1)),
    R.filter(
      graph.undirected
        ? ({v1: e1, v2: e2}) => e1 === v1 || e2 === v1
        : ({v1: e1}) => e1 === v1,
    ),
  )(graph.edges),
);

const appendEdgesMatrix = R.curry(
  (edges, graph) => {
    R.addIndex(R.forEach)(
      (row, sourceVertexIndex) => {
        R.addIndex(R.forEach)(
          (weight, vertexIndex) => {
            if (!weight)
              return;

            graph = appendEdge(
              graph.vertices[sourceVertexIndex].key,
              graph.vertices[vertexIndex].key,
              {weight},
              graph,
            );
          },
          row,
        );
      },
      edges,
    );

    return graph;
  },
);

const appendEdge = R.curry(
  (v1, v2, data, graph) => R.unless(
    R.compose(
      R.any(R.not),
      R.juxt(
        [
          findVertex(v1),
          findVertex(v2),
          R.complement(findEdge)(v1, v2),
        ],
      ),
    ),
    R.evolve(
      {
        edges: R.append({
          v1,
          v2,
          ...R.when(R.is(Number), R.objOf('weight'), data),
        }),
      },
    ),
  )(graph),
);

const appendEdges = R.curry(
  (edges, graph) => {
    let bufferGraph = graph;
    R.forEach(
      (edge) => {
        bufferGraph = appendEdge(...edge, bufferGraph);
      },
      edges,
    );
    return bufferGraph;
  },
);

exports.createBlankGraph = _graph;
exports.updateEdge = updateEdge;
exports.findEdge = findEdge;
exports.findEdges = findEdges;
exports.appendEdgesMatrix = appendEdgesMatrix;
exports.appendEdge = appendEdge;
exports.appendEdges = appendEdges;
exports.findBy = findBy;
exports.findVertex = findVertex;
exports.appendVertices = appendVertices;
exports.appendVertex = appendVertex;
