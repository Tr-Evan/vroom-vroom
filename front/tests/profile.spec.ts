import { test, expect } from '@playwright/test';

// On définit l'URL de base ici pour éviter de la répéter
const BASE_URL = 'http://localhost:5173/profile';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
});

test('La page de profile charge avec les bonnes infos de l\'utilisateur.', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Jean Dupont/i })).toBeVisible();
  await expect(page.getByText('Membre Society Club • VIP')).toBeVisible();
});

test("Ouvrir la modal et ajouter une nouvelle annonce", async ({ page }) => {
  // Attendre que la page soit complètement chargée
  await page.waitForLoadState('networkidle');
  
  // Attendre que le bouton soit visible avec un timeout plus long
  const ctaButton = page.getByRole('button', { name: 'Vendre un véhicule' });
  await expect(ctaButton).toBeVisible({ timeout: 10000 });
  await ctaButton.click();

  // Attendre que la modal apparaisse
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible({ timeout: 10000 });

  await expect(modal.getByRole('heading', { name: /Nouvelle Annonce/i })).toBeVisible();

  // --- 2. REMPLISSAGE DU FORMULAIRE ---
  await modal.getByLabel('Marque').fill('Porsche');
  await modal.getByLabel('Modèle').fill('911 GT3');
  await modal.getByLabel('Performance (ch)').fill('510');
  await modal.getByLabel('URL de la photo').fill('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1169&auto=format&fit=crop');
  
  await modal.getByLabel('Date de disponibilité').fill('2025-11-27');

  // --- 3. SOUMISSION ---
  const publishButton = modal.getByRole('button', { name: "Publier l'annonce" });
  await publishButton.click();

  // Attendre que la modal se ferme
  await expect(modal).toBeHidden({ timeout: 10000 });
});
