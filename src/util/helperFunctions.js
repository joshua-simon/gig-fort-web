import { format, addDays, isSameDay, startOfDay  } from "date-fns";

export const getGigsToday = (gigArray, currentDate) => {
    const currentDayGigs = gigArray.filter((gig) => {
      const formattedDate = format(new Date(currentDate), "do MMMM Y");
      const formattedGigDate = format(
        new Date(gig.dateAndTime.seconds * 1000),
        "do MMMM Y"
      );
      return formattedGigDate === formattedDate;
    });
    return currentDayGigs;
  };

  
  export const getGigsThisWeek = (gigsArray, currentDate) => {
    const weekFromNow = addDays(currentDate, 7);
  
    const gigsThisWeek = gigsArray.filter((gig) => {
      const gigDate = new Date(gig.dateAndTime.seconds * 1000);
      return (
        gigDate < weekFromNow && gig.dateAndTime.seconds * 1000 >= currentDate
      );
    });
  
    const gigsThisWeek_sorted = gigsThisWeek.sort(
      (a, b) => a.dateAndTime.seconds - b.dateAndTime.seconds
    );
  
    const gigsThisWeek_newDate = gigsThisWeek_sorted.map((item) => {
      const formattedDate = format(new Date(item.dateAndTime.seconds * 1000), "EEE LLL do Y");
      return { ...item, titleDate: formattedDate };
    });
  
    const gigsThisWeek_grouped = gigsThisWeek_newDate.reduce((acc, curr) => {
      if (acc[curr.titleDate]) {
        acc[curr.titleDate].push(curr);
      } else {
        acc[curr.titleDate] = [curr];
      }
      return acc;
    }, {});
  
    return gigsThisWeek_grouped;
  };
  

  export const getNextSevenDays = () => {
    const currentDate = new Date();
    const dates = [];
  
    // Get the start of the current day
    const startOfCurrentDay = startOfDay(currentDate);
  
    // Get the previous day
    const previousDate = addDays(startOfCurrentDay, -1);
    dates.push(previousDate);
  
    // Get the current day
    dates.push(startOfCurrentDay);
  
    // Get the next five days
    for (let i = 1; i <= 5; i++) {
      const nextDate = addDays(startOfCurrentDay, i);
      dates.push(nextDate);
    }
  
    return dates;
  };