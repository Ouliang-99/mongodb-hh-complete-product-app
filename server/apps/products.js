import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();

// Exercise #2: สร้าง API เพื่อเพิ่มข้อมูลสินค้า
productRouter.post("/", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("products");
    const productData = { name, price, image, description, category };
    await collection.insertOne(productData);

    return res.status(200).json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Can't create data because server error" });
  }
});

//Exercise #3 สร้าง API ด้วย Express เพื่อดูข้อมูลสินค้าทั้งหมด
productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const result = await collection.find().toArray();

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Can't fetch data because of server error" });
  }
});

//Exercise #4 : สร้าง API ด้วย Express เพื่อแก้ไขข้อมูลสินค้า
productRouter.put("/:productId", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = db.collection("products");
    const productData = { name, price, image, description, category };

    await collection.updateOne(
      { _id: new ObjectId(req.params.productId) },
      { $set: productData }
    );

    return res.status(200).json({
      message: "Product has been updated successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Can't update data because of server error" });
  }
});

//Exercise #5 สร้าง API ด้วย Express เพื่อลบข้อมูลสินค้า
productRouter.delete("/:productId", async (req, res) => {
  try {
    const collection = db.collection("products");

    await collection.deleteOne(
      { _id: new ObjectId(req.params.productId) }
    );

    return res.status(200).json({
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "Can't delete data because of server error" });
  }
});

export default productRouter;
