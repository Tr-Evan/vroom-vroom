// front/src/data/cars.ts

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  category: string;
}

export const cars: Car[] = [
  {
    id: 1,
    make: "Peugeot",
    model: "208 GT",
    year: 2021,
    price: 18500,
    mileage: 25000,
    fuel: "Essence",
    transmission: "Manuelle",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
    category: "Citadine"
  },
  {
    id: 2,
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 34900,
    mileage: 15000,
    fuel: "Électrique",
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop",
    category: "Berline"
  },
  {
    id: 3,
    make: "Renault",
    model: "Clio V",
    year: 2020,
    price: 14200,
    mileage: 45000,
    fuel: "Diesel",
    transmission: "Manuelle",
    image: "https://images.unsplash.com/photo-1620592750346-6467be569947?q=80&w=800&auto=format&fit=crop",
    category: "Citadine"
  },
  {
    id: 4,
    make: "Mercedes",
    model: "Classe A",
    year: 2019,
    price: 24500,
    mileage: 60000,
    fuel: "Hybride",
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
    category: "Compacte"
  },
  {
    id: 5,
    make: "Audi",
    model: "Q3 Sportback",
    year: 2023,
    price: 42000,
    mileage: 5000,
    fuel: "Essence",
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop",
    category: "SUV"
  },
  {
    id: 6,
    make: "Bugatti",
    model: "Divo",
    year: 2020,
    price: 5000000,
    mileage: 1200,
    fuel: "Essence",
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1627454820574-fb6aa50085a0?q=80&w=800&auto=format&fit=crop",
    category: "Supercar"
  }
];