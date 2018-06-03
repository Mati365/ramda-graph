import * as R from 'ramda';

export default (undirected = true) => ({
  edges: [], // e.g. [{v1: 'A', v2: 'B', weight: 2, data: {}} ... ]
  vertices: [], // list of vertices, all must have key attribute e.g. [{key: 'aa'..}, ..]
  undirected,
});

