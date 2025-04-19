const sampleClothes = [
  {
    id: 1,
    name: "Denim Jacket",
    price: 49.99,
    manufacturer: "Levi's",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Classic blue denim jacket for all seasons.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"]
  },
  {
    id: 2,
    name: "Graphic Tee",
    price: 19.99,
    manufacturer: "Uniqlo",
    country: "Japan",
    image: "https://via.placeholder.com/150",
    description: "Comfortable and stylish graphic t-shirt.",
    sizes: ["S", "M", "L"],
    colors: ["White", "Black"]
  },
  {
    id: 3,
    name: "Hoodie",
    price: 39.99,
    manufacturer: "Nike",
    country: "Vietnam",
    image: "https://via.placeholder.com/150",
    description: "Warm and cozy hoodie for chilly days.",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Navy"]
  },
  {
    id: 4,
    name: "Linen Shirt",
    price: 34.99,
    manufacturer: "Zara",
    country: "Spain",
    image: "https://via.placeholder.com/150",
    description: "Breathable linen shirt perfect for summer.",
    sizes: ["S", "M", "L"],
    colors: ["White", "Beige"]
  },
  {
    id: 5,
    name: "Chinos",
    price: 44.99,
    manufacturer: "H&M",
    country: "Bangladesh",
    image: "https://via.placeholder.com/150",
    description: "Smart casual chinos for everyday wear.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Khaki", "Navy"]
  },
  {
    id: 6,
    name: "Athletic Shorts",
    price: 24.99,
    manufacturer: "Adidas",
    country: "Germany",
    image: "https://via.placeholder.com/150",
    description: "Lightweight shorts designed for training.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Red"]
  },
  {
    id: 7,
    name: "Pullover Sweater",
    price: 54.99,
    manufacturer: "Gap",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Classic pullover with soft wool blend.",
    sizes: ["M", "L", "XL"],
    colors: ["Burgundy", "Gray"]
  },
  {
    id: 8,
    name: "Trench Coat",
    price: 89.99,
    manufacturer: "Burberry",
    country: "UK",
    image: "https://via.placeholder.com/150",
    description: "Stylish trench coat with waterproof fabric.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Black"]
  },
  {
    id: 9,
    name: "Polo Shirt",
    price: 29.99,
    manufacturer: "Lacoste",
    country: "France",
    image: "https://via.placeholder.com/150",
    description: "Breathable polo shirt with iconic logo.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Blue"]
  },
  {
    id: 10,
    name: "Jeans",
    price: 59.99,
    manufacturer: "Wrangler",
    country: "Mexico",
    image: "https://via.placeholder.com/150",
    description: "Durable jeans made for comfort and style.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Dark Blue", "Black"]
  },
  {
    id: 11,
    name: "Running Tights",
    price: 39.99,
    manufacturer: "Under Armour",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Compression tights built for performance.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Gray"]
  },
  {
    id: 12,
    name: "Fleece Jacket",
    price: 69.99,
    manufacturer: "Patagonia",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Eco-friendly fleece jacket for warmth.",
    sizes: ["M", "L", "XL"],
    colors: ["Olive", "Gray"]
  },
  {
    id: 13,
    name: "Crop Top",
    price: 22.99,
    manufacturer: "Forever 21",
    country: "China",
    image: "https://via.placeholder.com/150",
    description: "Trendy crop top for casual days out.",
    sizes: ["S", "M", "L"],
    colors: ["Pink", "White"]
  },
  {
    id: 14,
    name: "Cargo Pants",
    price: 46.99,
    manufacturer: "Carhartt",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Functional cargo pants with deep pockets.",
    sizes: ["30", "32", "34"],
    colors: ["Green", "Black"]
  },
  {
    id: 15,
    name: "Sleeveless Blouse",
    price: 27.99,
    manufacturer: "Mango",
    country: "Spain",
    image: "https://via.placeholder.com/150",
    description: "Lightweight blouse for warm weather.",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Lavender"]
  },
  {
    id: 16,
    name: "Puffer Jacket",
    price: 99.99,
    manufacturer: "North Face",
    country: "Vietnam",
    image: "https://via.placeholder.com/150",
    description: "Insulated jacket for extreme cold.",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Red"]
  },
  {
    id: 17,
    name: "Oversized T-Shirt",
    price: 25.99,
    manufacturer: "ASOS",
    country: "UK",
    image: "https://via.placeholder.com/150",
    description: "Relaxed fit tee with minimal design.",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Green"]
  },
  {
    id: 18,
    name: "Yoga Pants",
    price: 35.99,
    manufacturer: "Lululemon",
    country: "Canada",
    image: "https://via.placeholder.com/150",
    description: "Stretchy and supportive yoga pants.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"]
  },
  {
    id: 19,
    name: "Corduroy Jacket",
    price: 64.99,
    manufacturer: "Urban Outfitters",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Retro-style corduroy jacket.",
    sizes: ["M", "L", "XL"],
    colors: ["Tan", "Brown"]
  },
  {
    id: 20,
    name: "Flannel Shirt",
    price: 42.99,
    manufacturer: "Timberland",
    country: "USA",
    image: "https://via.placeholder.com/150",
    description: "Soft flannel for a laid-back look.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Green"]
  }
];

export default sampleClothes;
