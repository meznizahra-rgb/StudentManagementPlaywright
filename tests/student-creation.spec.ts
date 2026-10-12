import { test, expect } from '@playwright/test';
import { StudentPage } from '../pages/StudentPage';

test('Créer un étudiant avec succès', async ({ page }) => {
  const studentPage = new StudentPage(page);
  const email = `student.${Date.now()}@example.com`;

  // 1. Ouvrir l'application
  await studentPage.goto();

  // 2. Créer un étudiant
  await studentPage.createStudent(
    'Zahra',
    'Test',
    email,
    '6A'
  );

  // 3. Vérifier le message de succès
  await expect(
    page.getByText('Étudiant créé avec succès.')
  ).toBeVisible();

  // 4. Cliquer sur Actualiser
  await studentPage.refreshStudentList();

  // 5. Vérifier l'étudiant dans le tableau
  await expect(
    page.locator('table').getByText(email)
  ).toBeVisible({ timeout: 10000 });
});