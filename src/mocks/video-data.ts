export interface Video {
  id: number;
  title: string;
  url: string;
  poster: string;
  price: number;
}

function priceGenerator(): number {
  return Math.floor(Math.random() * 30);
}

export const allVideos = [
  {
id: 1,
title: 'Video 1',
url: '',
poster: 'https://loremflickr.com/320/240/movies/all?1',
price: priceGenerator()
  },
  {
id: 2,
title: 'Video 2',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/movies/all?3',
price: priceGenerator()
  },
  {
id: 3,
title: 'Video 3',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/movies/all?4',
price: priceGenerator()
  },
  {
id: 4,
title: 'Video 4',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/movies/all?8',
price: priceGenerator()
  },
  {
id: 5,
title: 'Video 5',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/movies/all?14',
price: priceGenerator()
  },
  {
id: 6,
title: 'Video 6',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/sport/all',
price: priceGenerator()
  },
  {
id: 7,
title: 'Video 7',
url: 'https://ak.picdn.net/shutterstock/videos/1054068659/preview/stock-footage-group-of-young-boys-play-soccer-training-day-on-the-football-field-teenagers-play-football-on-a.webm',
poster: 'https://loremflickr.com/320/240/fun/all',
price: priceGenerator()
  },
]

export async function getVideos(): Promise<Video[]> {
  return allVideos;
}