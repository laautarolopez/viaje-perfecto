import { test, expect, type Page } from '@playwright/test';
import { notes, userID, runSeed, deleteSeed } from './helper';

async function setAuthCookie(page: Page) {
  const cookie = {
    name: 'user_id',
    value: userID,
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
  const path_check = 'path[d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"]'
  const path_uncheck = 'path[d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"]'

  test('Se comprueban todas las notas', async ({ page }) => {
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

  test('Se muestra el icono de completado cuando la nota está completada', async ({ page }) => {
    const complete_note = notes[0]
    const checkItem = await page.getByTestId(`checkbox-${complete_note.id}`);

    const icon_check = checkItem.locator(path_check);
    const icon_uncheck = checkItem.locator(path_uncheck);

    await expect(icon_check).toBeVisible();
    await expect(icon_uncheck).not.toBeVisible();
  })

  test('Se muestra el icono de incompleto cuando la nota está incompleta', async ({ page }) => {
    const incomplete_note = notes[3]
    const checkItem = await page.getByTestId(`checkbox-${incomplete_note.id}`);

    const icon_check = checkItem.locator(path_check);
    const icon_uncheck = checkItem.locator(path_uncheck);

    await expect(icon_uncheck).toBeVisible();
    await expect(icon_check).not.toBeVisible();
  })

  test('Se muestra el cambio de estado de una nota completa a incompleta', async ({ page }) => {
    const complete_note = notes[1]
    const checkItem = await page.getByTestId(`checkbox-${complete_note.id}`);

    const icon_check = checkItem.locator(path_check);
    const icon_uncheck = checkItem.locator(path_uncheck);

    await expect(icon_check).toBeVisible();
    await expect(icon_uncheck).not.toBeVisible();

    await icon_check.click();

    await expect(icon_uncheck).toBeVisible();
    await expect(icon_check).not.toBeVisible();
  })
})

test.afterAll(async () => {
  await deleteSeed()
})