# ramda-graph &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/ramda-graph.svg)](https://badge.fury.io/js/ramda-graph) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
Simple functional graph implementation in Ramda.js

## Installation
Using NPM:
```npm install ramda-graph```

Using Yarn:
```yarn install ramda-graph```

### Example
```js
const R = require('ramda');
const G = require('ramda-graph');

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
/*
 * Output:
 * {undirected: true, edges: [..], vertices: [..]}
 */
```

## License
The MIT License (MIT)

Copyright (c) 2018 Mateusz Bagiński

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
