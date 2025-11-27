import { test, expect } from '@playwright/test';

// On définit l'URL de base ici pour éviter de la répéter
const BASE_URL = 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('La page d\'accueil charge avec le bon titre et sous-titre', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /L'automobile.*de prestige/i })).toBeVisible();
  await expect(page.getByText('Créé par des passionnés, pour des passionnés.')).toBeVisible();
});

test('La navigation vers le Stock via le bouton CTA fonctionne', async ({ page }) => {
  const ctaButton = page.getByRole('button', { name: 'Voir nos véhicules' });
  
  await expect(ctaButton).toBeVisible();
  await ctaButton.click();

  await expect(page).toHaveURL(`${BASE_URL}/stock`);

  await expect(page.getByRole('heading', { name: 'Nos Annonces' })).toBeVisible();
});

