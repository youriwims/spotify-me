import { Buffer } from 'buffer';
import { stringify } from 'querystring';
import spotify from './credentials';

const auth = Buffer.from(`${spotify.client_id}:${spotify.client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  // Build body for refresh token request
  const data = {
    grant_type: 'refresh_token',
    refresh_token: spotify.refresh_token
  };

  // Craft POST request to fetch token
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: stringify(data)
  });

  return response.json();
};