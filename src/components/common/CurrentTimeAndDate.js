// This is a functional component that provides the current time in 12 hour format

const currentTimeAndDate = () => {
  const timeAdjusted = (hours, minutes, month, date, year) => {
    const minsAdjusted = () => {
      if (minutes < 10) {
        return `0${minutes}`;
      }
      return minutes;
    };
    if (hours > 12) {
      return (`${hours - 12}:${minsAdjusted()}pm, ${month}/${date}/${year}`);
    }
    return (`${hours}:${minsAdjusted()}am, ${month}/${date}/${year}`);
  };
  const time = new Date();

  const timeNow = timeAdjusted(time.getHours(), time.getMinutes(), (time.getMonth() + 1), time.getDate(), time.getFullYear());

  return timeNow;
};

export default currentTimeAndDate;
