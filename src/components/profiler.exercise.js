
import * as React from 'react';
import {client} from 'utils/api-client';

let queue = [];
const sendProfileQueue = () => {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
};

setInterval(sendProfileQueue, 5000)

const Profiler = ({metadata, phases, ...props}) => {
  const reportProfile = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions, // the Set of interactions belonging to this update
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
    }
  };

  return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };