import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb+srv://shopAdmin:shopAdmin@myshopproducts-huk3f.mongodb.net/products?retryWrites=true&w=majority");

const db = client.database("myShop");
const productObj = db.collection("products");

export default productObj;