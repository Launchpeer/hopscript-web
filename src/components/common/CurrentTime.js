// This is a functional component that provides the current time in 12 hour format

const currentTime = () => {
  const timeAdjusted = (hours, minutes) => {
    if (hours > 12) {
      return (`${hours - 12}:${minutes}pm`);
    }
    return (`${hours}:${minutes}am`);
  };
  const time = new Date();

  const timeNow = timeAdjusted(time.getHours(), time.getMinutes());

  return timeNow;
};

export default currentTime;
