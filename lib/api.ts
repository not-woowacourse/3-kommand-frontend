import { Movies } from '@/__generated__/Movies';

const PROXY_API_PREFIX = '/backend-api';

const HTTP_HEADER_KEYS = {
  CLIENT_NAME: 'Client-Name',
};

const movies = new Movies({
  baseURL: PROXY_API_PREFIX,
  headers: {
    [HTTP_HEADER_KEYS.CLIENT_NAME]: process.env.NEXT_PUBLIC_CLIENT_NAME,
  },
});

const api = {
  movies,
};

export { api };
