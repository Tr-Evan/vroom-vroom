import { test, expect } from '@playwright/test';

test.describe('Liste des véhicules', () => {
  test.beforeEach(async ({ page }) => {
    // Intercepter la requête API et renvoyer des données de test
    await page.route('**/announcements', async route => {
      const json = [
        {
          id: 1,
          date: "2023-01-01",
          famous: false,
          imageUrl: "/test-car.jpg",
          car: {
            id: 1,
            model: "911",
            marque: "Porsche",
            perf: "385ch",
            user_id: 1,
            created_at: "2023-01-01",
            updated_at: "2023-01-01"
          },
          stats: {
            id: 1,
            cars_id: 1,
            favoris: 10,
            views: 150
          },
          created_at: "2023-01-01",
          updated_at: "2023-01-01"
        }
      ];
      await route.fulfill({ json });
    });

    // Aller sur la page de liste des véhicules
    await page.goto('http://localhost:5173/stock');
  });

  test('doit afficher la liste des véhicules', async ({ page }) => {
    // Vérifier que le titre de la page est visible
    await expect(page.getByRole('heading', { name: 'Nos Annonces' })).toBeVisible();

    // Vérifier que le compteur de véhicules est présent
    await expect(page.getByText(/1 véhicule/)).toBeVisible();

    // Vérifier que les informations du véhicule sont affichées
    await expect(page.getByText('Porsche 911')).toBeVisible();
    await expect(page.getByText(/385ch/)).toBeVisible();
    await expect(page.getByText(/2023/)).toBeVisible();
  });

  test('doit filtrer les véhicules par recherche', async ({ page }) => {
    // Remplir le champ de recherche
    await page.getByPlaceholder('Ex: Porsche...').fill('Audi');
    
    // Vérifier que le message "Aucun bolide ne correspond à ces critères." s'affiche
    await expect(page.getByText('Aucun bolide ne correspond à ces critères.')).toBeVisible();
  });

  test('doit filtrer les véhicules par budget', async ({ page }) => {
    // Récupérer le curseur de budget et le déplacer à 100 000€
    const slider = page.locator('input[type="range"]');
    await slider.fill('20000');
    
    // Vérifier que la valeur du budget est bien mise à jour
    await expect(page.getByText('20 000 €')).toBeVisible();
    
    // Vérifier que le filtre est appliqué (le véhicule de test coûte plus de 100 000€, donc ne devrait pas être affiché)
    await expect(page.getByText('Aucun bolide ne correspond à ces critères.')).toBeVisible();
  });
});