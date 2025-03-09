import query from "../../db";

const SAMPLE_PRODUCTS: { name: string, price: number, image: string }[] = [
    {
        name: "Galaxy Book",
        price: 2000,
        image: "https://www.sammobile.com/wp-content/uploads/2022/02/Samsung-Galaxy-Book-2-Pro-360-2.jpg"
    },
    {
        name: "Premium Keyboard",
        price: 450,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtleWJvYXJkfGVufDB8fDB8fHww"
    },
    {
        name: "Pink Airpods Max",
        price: 5000.02,
        image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEFpcnBvZHMlMjBtYXh8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Used Pie",
        price: 20,
        image: "https://images.unsplash.com/photo-1554298128-c916518a4b34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGllfGVufDB8fDB8fHww"
    },
    {
        name: "Dank Handkerchief",
        price: 250,
        image: "https://images.unsplash.com/photo-1560283079-02f8478adaeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhbmRrZXJjaGllZnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        name: "Everyday Fish",
        price: 2,
        image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZpc2h8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Mac Studio",
        price: 25,
        image: "https://images.unsplash.com/photo-1650105312043-647cc3ac893e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjJTIwc3R1ZGlvfGVufDB8fDB8fHww"
    }
]

const seedProducts: () => void = () => {
    // first, clear existing data
    query(`TRUNCATE TABLE products RESTART IDENTITY`)
        // insert all products
        .then(() => Promise.all(SAMPLE_PRODUCTS.map(product => query(`
            INSERT INTO products (name, price, image)
            VALUES ('${product.name}', ${product.price}, '${product.image}')
          `))))
        .then(() => {
            console.log("Database seeded successfully");
            process.exit(0); // success code
        })
        .catch(error => {
            console.error("Error seeding database:", error);
            process.exit(1); // failure code
        })
}

seedProducts()