Live Link: https://bookcatapi.vercel.app
Application Routes:
User
api/v1/auth/signup (POST)
api/v1/users (GET)
api/v1/users/93c1786a-ceb9-49cc-a93c-b70c8a1f7cea (Single GET) Include an id that is saved in your database
api/v1/users/93c1786a-ceb9-49cc-a93c-b70c8a1f7cea (PATCH)
api/v1/users/93c1786a-ceb9-49cc-a93c-b70c8a1f7cea (DELETE) Include an id that is saved in your database
api/v1/profile (GET)
Category
api/v1/categories/create-category (POST)
api/v1/categories (GET)
api/v1/categories/5786092a-3cfc-4eb8-88a2-f53444b52f84 (Single GET) Include an id that is saved in your database
api/v1/categories/5786092a-3cfc-4eb8-88a2-f53444b52f84 (PATCH)
api/v1/categories/5786092a-3cfc-4eb8-88a2-f53444b52f84 (DELETE) Include an id that is saved in your database
Books
api/v1/books/create-book (POST)
api/v1/books (GET)
api/v1/books/:categoryId/category (GET)
api/v1/books/:id (GET)
api/v1/books/:id (PATCH)
api/v1/books/:id (DELETE)
Orders
api/v1/orders/create-order (POST)
api/v1/orders (GET)
api/v1/orders/:orderId (GET)