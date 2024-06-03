const ROUTES = {
  ROOT: '/',
  MOVIE_OF: (movieId: number) => `/movies/${movieId}`,
} as const;

export { ROUTES };
