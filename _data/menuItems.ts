export type Course = "Starter" | "Main Course" | "Dessert";

export interface DataMenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  imageUri?: string;
  orders?: number; // times ordered
  likes?: number; // customer likes / favorites
}

export const menuData: DataMenuItem[] = [
  {
    id: "1",
    name: "Chicken Pasta",
    description: "Creamy chicken pasta served with vegetables.",
    course: "Main Course",
    price: 85,
    orders: 120,
    likes: 45,
    imageUri:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with a soft, moist texture.",
    course: "Dessert",
    price: 55,
    orders: 80,
    likes: 70,
    imageUri:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Chicken Livers and Garlic Bread",
    description: "A savoury starter with toasted garlic bread.",
    course: "Starter",
    price: 40,
    orders: 60,
    likes: 25,
    imageUri:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Beef Burger & Fries",
    description: "A classic burger with crispy fries and sauce.",
    course: "Main Course",
    price: 75,
    orders: 95,
    likes: 50,
    imageUri:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Vegan Salad",
    description: "Fresh seasonal greens with a zesty dressing.",
    course: "Starter",
    price: 35,
    orders: 50,
    likes: 30,
    imageUri:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Grilled Salmon",
    description:
      "Perfectly grilled salmon with lemon butter and seasonal greens.",
    course: "Main Course",
    price: 110,
    orders: 40,
    likes: 55,
    imageUri:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    name: "Tomato & Basil Bruschetta",
    description:
      "Toasted ciabatta topped with ripe tomato, fresh basil and olive oil.",
    course: "Starter",
    price: 48,
    orders: 72,
    likes: 38,
    imageUri:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    name: "Creamy Mushroom Soup",
    description: "A velvety mushroom soup finished with cream and herbs.",
    course: "Starter",
    price: 52,
    orders: 64,
    likes: 42,
    imageUri:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "9",
    name: "Lemon Herb Chicken",
    description:
      "Grilled chicken breast with lemon, garden herbs and roasted vegetables.",
    course: "Main Course",
    price: 98,
    orders: 88,
    likes: 61,
    imageUri:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    name: "Beef Lasagne",
    description: "Layers of slow-cooked beef ragù, pasta and creamy béchamel.",
    course: "Main Course",
    price: 105,
    orders: 91,
    likes: 58,
    imageUri:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "11",
    name: "Malva Pudding",
    description:
      "Traditional South African sponge pudding served warm with custard.",
    course: "Dessert",
    price: 48,
    orders: 102,
    likes: 82,
    imageUri:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "12",
    name: "Vanilla Cheesecake",
    description: "Baked vanilla cheesecake with a buttery biscuit base.",
    course: "Dessert",
    price: 62,
    orders: 76,
    likes: 67,
    imageUri:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80",
  },
];

export default menuData;
