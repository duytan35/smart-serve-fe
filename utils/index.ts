export const formatDate = (date: any) => {
  const startDateString = date;
  const startDate = new Date(startDateString);

  const day = startDate?.getDate()?.toString()?.padStart(2, '0');
  const month = (startDate?.getMonth() + 1)?.toString()?.padStart(2, '0');
  const year = startDate?.getFullYear();

  const formattedStartDate = `${day}/${month}/${year}`;
  return formattedStartDate;
};

export const calculateWaitingTime = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  // const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  const padZero = (num: number) => String(num).padStart(2, '0');

  return `${padZero(diffHours)}:${padZero(diffMinutes)}`;
  // return `${padZero(diffHours)}:${padZero(diffMinutes)}:${padZero(diffSeconds)}`;
};

export const formatCurrency = (price: number) => {
  const [integerPart, decimalPart] = price.toString().split('.');
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
};

export const timeDifferenceFromNow = (inputTime: string) => {
  const now = new Date();
  const inputDate = new Date(inputTime);

  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const remainingMinutes = diffInMinutes % 60;
    return remainingMinutes > 0
      ? `${diffInHours}h${remainingMinutes}m ago`
      : `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};
