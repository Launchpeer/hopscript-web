// This is a functional component that provides the current time in 12 hour format

const currentTime = () => {
  const timeAdjusted = (hours, minutes) => {
    const minsAdjusted = () => {
      if (minutes < 10) {
        return `0${minutes}`;
      }
      return minutes;
    };
    if (hours > 12) {
      return (`${hours - 12}:${minsAdjusted()}pm`);
    }
    return (`${hours}:${minsAdjusted()}am`);
  };
  const time = new Date();

  const timeNow = timeAdjusted(time.getHours(), time.getMinutes());

  return timeNow;
};

export default currentTime;
