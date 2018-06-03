const R = require('ramda');
const G = require('../dist/ramda-graph');

const CITY_GRAPH = R.compose(
  // G.appendEdgesMatrix([
    // [0, 572, 1600],
    // [572, 0, 1108],
    // [1600, 1108, 0],
  // ]),

  // link array of edges
  G.appendEdges([
    ['London', 'Warsaw', 1600],
  ]),

  // link edges
  G.appendEdge(
    'Berlin', 'London',
    1108, // weight only
  ),

  G.appendEdge(
    'Warsaw', 'Berlin',
    {
      weight: 572, // distance
      // ... other stuff
    },
  ),

  // appends single vertex
  G.appendVertex('Kolobrzeg', {nation: 'Poland'}),

  // appends to created graph two vertices
  G.appendVertices([
    {
      key: 'Warsaw',
      // ... additional vertex data used to e.g. rendering
      nation: 'Poland',
    },
    {
      key: 'Berlin',
      nation: 'Germany',
    },
    {
      key: 'London',
      nation: 'UK',
    },
  ]),

  // creates blank Graph object
  G.createBlankGraph,
)(true);

// find all linked edges to 'Warsaw' vertex
G.findEdges('Warsaw', CITY_GRAPH);

// find edge between two cities
G.findEdge('Warsaw', 'Berlin', CITY_GRAPH);

// update distance betwen berlin and london
G.updateEdge(
  'Berlin', 'London',
  {
    v1: 'Berlin',
    v2: 'London',
    weight: 1109
  },
  CITY_GRAPH
);

// find vertex
G.findVertex('Warsaw', CITY_GRAPH);

console.log(CITY_GRAPH);
