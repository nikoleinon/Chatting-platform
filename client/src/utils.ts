export const formatDateAndTimeWeekday = (dateString: string): string => {
  const date = new Date(dateString);

  const dayFormat = new Intl.DateTimeFormat("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const timeFormat = new Intl.DateTimeFormat("fi-FI", {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDate = dayFormat.format(date);
  const capitalizedWeekday = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return `${capitalizedWeekday} klo ${timeFormat.format(date)}`;
};

export const formatDateAndTimeWeekdayShort = (dateString: string): string => {
  const date = new Date(dateString);

  const dayFormat = new Intl.DateTimeFormat("fi-FI", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const timeFormat = new Intl.DateTimeFormat("fi-FI", {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDate = dayFormat.format(date);
  const capitalizedWeekday = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return `${capitalizedWeekday} klo ${timeFormat.format(date)}`;
};

export const formatDateAndTime = (dateString: string): string => {
  const date = new Date(dateString);

  const dayFormat = new Intl.DateTimeFormat("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const timeFormat = new Intl.DateTimeFormat("fi-FI", {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDate = dayFormat.format(date);
  const capitalizedWeekday = formattedDate.slice(1);

  return `${capitalizedWeekday} klo ${timeFormat.format(date)}`;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  const timeFormat = new Intl.DateTimeFormat("fi-FI", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${timeFormat.format(date)}`;
};
