import { expect, test } from '@playwright/test';
import { login } from '../../src/services/auth.service.js';

test('auth API returns success for valid credentials', async ({ request }) => {
  const { response, body } = await login(request, {
    username: 'test.user@example.com',
    password: 'Password123!',
  });

  expect(response.ok()).toBeTruthy();
  expect(body).toHaveProperty('token');
});
