# Digital Cow Hut Backend Assignment

### Live Link: https://assignment-4-cow-hut.vercel.app/

### Application Routes:

### Auth (User)

- Route: https://assignment-4-cow-hut.vercel.app/api/v1/auth/login (POST)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/auth/signup (POST)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/auth/refresh-token (POST)

### Auth (Admin)

- Route: https://assignment-4-cow-hut.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/admins/login (POST)

### User

- Route: https://assignment-4-cow-hut.vercel.app/api/v1/users (GET) Include an id that is saved in your database
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH) Include an id that is saved in your database
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

#### Cows

- Route: https://assignment-4-cow-hut.vercel.app/api/v1/cows (POST)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/cows (GET)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/cows/COW-ID (Single GET) Include an id that is saved in your database
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/cows/COW-ID (PATCH) Include an id that is saved in your database
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/cows/COW-ID (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

- https://assignment-4-cow-hut.vercel.app/api/v1/cows?pag=1&limit=10
- https://assignment-4-cow-hut.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- https://assignment-4-cow-hut.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000
- https://assignment-4-cow-hut.vercel.app/api/v1/cows?location=Chattogram
- https://assignment-4-cow-hut.vercel.app/api/v1/cows?searchTerm=Cha

#### Orders

- Route: https://assignment-4-cow-hut.vercel.app/api/v1/orders (POST)
- Route: https://assignment-4-cow-hut.vercel.app/api/v1/orders (GET)
