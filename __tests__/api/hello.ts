import hello from '../../pages/api/hello';
import type { NextApiRequest, NextApiResponse } from 'next';

// source: https://spacejelly.dev/posts/how-to-test-serverless-functions-with-jest-next-js-api-routes/
test('GET /api/hello', () => {
  const req = {} as NextApiRequest;

  const json = jest.fn();

  const status = jest.fn(() => {
    return {
      json,
    };
  });

  const res = {
    status,
  } as any as NextApiResponse;

  hello(req, res);

  expect(json).toBeCalledTimes(1);
  expect(json.mock.calls[0][0]).toEqual({ name: 'John Doe' });
});
