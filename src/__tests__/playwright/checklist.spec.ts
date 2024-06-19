import { test, expect, type Page } from '@playwright/test';
import { trip4ID, notes, user1ID, runSeed } from '../api/helper';

async function setAuthCookie(page: Page) {
  const cookie = {
    name: 'user_id',
    value: user1ID,
    domain: 'localhost',
    path: '/',
  };

  await page.context().addCookies([cookie]);
}

test.beforeAll(async () => {
  await runSeed()
})

test.beforeEach(async ({ page }) => {
  await setAuthCookie(page);
  await page.goto('http://localhost:3000/');
});

test.describe('Checklist de Sur Argentino', () => {
  test('Se comprueban desde el contenedor checklist', async ({ page }) => {
      for (const note of notes) {
        await expect(page.getByTestId('checklist')).toContainText(note.description);
      }
  })

  test('Se comprueban desde el CheckItem', async ({ page }) => {
    for (const note of notes) {
      const checklistContainer = await page.getByTestId('checklist');
      const checkItem = await checklistContainer.getByTestId(`checkitem-${note.id}`);
      await expect(checkItem).toContainText(note.description);
    }
  })

  test('Se muestra el input con el placeholder dado', async ({ page }) => {
    const input = page.getByPlaceholder('Escribe tu nueva nota aquí')

    await expect(input).toBeVisible()
    await expect(input).toHaveAttribute('placeholder', 'Escribe tu nueva nota aquí')
  })
})