const { PRIORITIES } = require("../utils/enums");

const filterByPriority = (logs, level) => {
  const priorities = {
    verbose: PRIORITIES.VERBOSE,
    debug: PRIORITIES.DEBUG,
    info: PRIORITIES.INFO,
    warning: PRIORITIES.WARN,
    error: PRIORITIES.ERROR,
    fatal: PRIORITIES.FATAL,
  };
  if (!priorities[level]) return logs;

  return logs.filter((log) => log.priority === priorities[level]);
};

const filterByTag = (logs, tag) => {
  if (!tag) return logs;
  return logs.filter((log) => log.tag.includes(tag));
};

const filterByPid = (logs, pid) => {
  if (!pid) return logs;
  return logs.filter((log) => log.pid.toString() === pid);
};

const filterByKeyword = (logs, keyword) => {
  if (!keyword) return logs;
  return logs.filter((log) =>
    log.message.toLowerCase().includes(keyword.toLowerCase())
  );
};

const filterByTimeRange = (logs, startTime, endTime) => {
  if (!startTime && !endTime) return logs;

  return logs.filter((log) => {
    const logTime = new Date(log.timestamp);
    return (
      (!startTime || logTime >= new Date(startTime)) &&
      (!endTime || logTime <= new Date(endTime))
    );
  });
};

module.exports = {
  filterByPriority,
  filterByTag,
  filterByPid,
  filterByKeyword,
  filterByTimeRange,
};
