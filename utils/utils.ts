export const formatPrice = (price: Number) => {
  const numberString = String(price);
  const numberArray = numberString?.split('');
  const dotPosition = numberArray?.length % 3 || 3;
  for (let i = dotPosition; i < numberArray?.length; i += 4) {
    numberArray?.splice(i, 0, '.');
  }
  const formattedNumber = numberArray.join('');
  return formattedNumber;
};

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
