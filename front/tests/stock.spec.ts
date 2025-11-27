import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:5173';
const mockAnnouncements = [
  {
    id: 1,
    cars_id: 101,
    stats_id: 1,
    date: '2023-05-01T00:00:00Z',
    famous: false,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Porsche',
    car: {
      id: 101,
      model: '911 Carrera',
      marque: 'Porsche',
      perf: '450 ch',
      user_id: 1,
      created_at: '2023-05-01',
      updated_at: '2023-05-01',
    },
    stats: { id: 1, cars_id: 101, favoris: 3, views: 124 },
    created_at: '2023-05-01',
    updated_at: '2023-05-01',
  },
  {
    id: 2,
    cars_id: 102,
    stats_id: 2,
    date: '2022-08-10T00:00:00Z',
    famous: true,
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Ferrari',
    car: {
      id: 102,
      model: 'F8 Tributo',
      marque: 'Ferrari',
      perf: '720 ch',
      user_id: 2,
      created_at: '2022-08-10',
      updated_at: '2022-08-10',
    },
    stats: { id: 2, cars_id: 102, favoris: 5, views: 230 },
    created_at: '2022-08-10',
    updated_at: '2022-08-10',
  },
];

test.beforeEach(async ({ page }) => {
  // Mock de l'API
  await page.route('http://localhost:3000/announcements', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockAnnouncements),
    })
  );

  await page.goto(BASE_URL + '/stock');
});

test('La page charge le titre et sous-titre', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Nos Annonces/i })).toBeVisible();
  await expect(page.getByText(/véhicules de prestige disponibles/i)).toBeVisible();
});

test('Les annonces sont affichées avec image, marque, modèle et prix', async ({ page }) => {
  for (const car of mockAnnouncements) {
    await expect(page.getByText(car.car.marque)).toBeVisible();
    await expect(page.getByText(car.car.model)).toBeVisible();
    await expect(page.locator(`img[src="${car.imageUrl}"]`)).toBeVisible();
  }
});

test('Filtrage par catégorie fonctionne', async ({ page }) => {
  await page.selectOption('select', 'Sportive');
  const cards = await page.locator('.grid div').all();
  for (const card of cards) {
    const categoryBadge = card.locator('span', { hasText: /(Sportive|SUV|Berline|GT)/ });
    await expect(categoryBadge).toHaveText(/Sportive/);
  }
});

test('Recherche par texte fonctionne', async ({ page }) => {
  const searchInput = page.locator('input[placeholder^="Ex: Porsche"]');
  await searchInput.fill('Ferrari');
  await searchInput.press('Enter');
  await expect(page.getByText('Ferrari')).toBeVisible();
  await expect(page.getByText('Porsche')).not.toBeVisible();
});

test('Cliquer sur "Voir détails" navigue vers la bonne page', async ({ page }) => {
  const firstCar = mockAnnouncements[0];
  await page.getByRole('button', { name: /Voir détails/i }).first().click();
  await expect(page).toHaveURL(new RegExp(`/stock/${firstCar.id}`));
});
