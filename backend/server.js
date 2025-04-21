import express from 'express'
import cors from 'cors'

import{getUser, createUser} from './database.js'
import { filterProducts, getAvailableFilters, getProductById } from './database.js';
import { addToCart, getCartItems, deleteCartItem, updateCartQuantity } from './database.js';
import { leaveReview, getReviews } from './database.js';

const app = express()

app.use(express.json())
app.use(cors())

app.post("/users/login", async (req,res) => {
    const {email, password} = req.body
    const user = await getUser(email, password)
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    res.send(user)
})

app.post("/users", async (req,res) => {
    const {username, email, password} = req.body
    const user = await createUser(username, email, password)
    res.status(201).send(user)
})

app.get("/products", async (req, res) => {
    const {sortOrder, selectedBrand, selectedCountry} = req.query
    const products = await filterProducts(sortOrder, selectedBrand, selectedCountry)
    res.status(203).send(products)
})

app.get("/products/id", async (req, res) => {
    const {id} = req.query
    const product = await getProductById(id)
    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }
    res.status(201).send(product)
})

app.get("/filters", async (req, res) => {
    const filters = await getAvailableFilters()
    res.status(201).send(filters)
})

app.post("/addcart", async (req, res) => {
    const {userId, productId, size, color} = req.body
    const cart = await addToCart(userId, productId, size, color)
    res.status(201).send(cart)
})

app.get("/cart", async (req, res) => {
    const userId = req.query.userId;
  
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
  
    try {
      const items = await getCartItems(userId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

app.delete("/cart", async (req, res) => {
    const {Id} = req.body
    const cart = await deleteCartItem(Id)
    if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
    }
    res.status(200).send(cart)
})


app.put("/cart/quantity", async (req, res) => {
    const { id, quantity } = req.body;
  
    if (!id || typeof quantity !== "number") {
      return res.status(400).json({ error: "Invalid ID or quantity" });
    }
  
    try {
      const result = await updateCartQuantity(id, quantity);
      res.status(200).json({ message: "Quantity updated", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to update quantity" });
    }
  });

app.post("/reviews", async (req, res) => {
    const {productId, userId, rating, comment} = req.body
    const review = await leaveReview(productId, userId, rating, comment)
    res.status(201).send(review)
})

app.get("/reviews", async (req, res) => {
    const {productId} = req.query
    const reviews = await getReviews(productId)
    if (!reviews) {
        return res.status(404).json({ message: "Reviews not found." });
    }
    res.status(200).send(reviews)
})
  

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})