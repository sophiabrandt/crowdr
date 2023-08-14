import { User } from '@prisma/client';

export const fetcher = async ({
  url,
  method,
  body,
  json,
}: {
  url: any;
  method: any;
  body: any;
  json: boolean;
}): Promise<any> => {
  const fetchOptions = {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, fetchOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          const responseMessage = JSON.parse(text);
          throw new Error(
            `API Error: ${res.status} ${responseMessage.message}`
          );
        });
      }
      return res;
    })
    .then((res) => (json ? res.json() : res));
};

export const register = async (user: Partial<User>) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signin = async (user: Partial<User>) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const createNewProject = (name: string) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
    json: false,
  });
};

export const addReward = (
  name: string,
  description: string,
  expected_due: string,
  projectId: string
) => {
  return fetcher({
    url: '/api/reward',
    method: 'POST',
    body: { name, description, expected_due, projectId },
    json: false,
  });
};
