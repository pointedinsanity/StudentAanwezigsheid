# StudentAanwezigsheid — MVC scaffold with Supabase

Quick start:

1. Copy `.env.example` to `.env` and fill your Supabase credentials.
2. Install dependencies: `npm install`
3. Run: `npm run dev` or `npm start`

Where Supabase is configured:
- See [src/config/supabaseClient.js](src/config/supabaseClient.js) for the Supabase client.
- Set `SUPABASE_URL` and `SUPABASE_KEY` in the `.env` file.

Files of interest:
- [src/server.js](src/server.js) — app entry
- [src/models/studentModel.js](src/models/studentModel.js) — example model using Supabase
- [src/controllers/studentController.js](src/controllers/studentController.js) — controller
- [src/routes/studentRoutes.js](src/routes/studentRoutes.js) — routes
- [src/views/index.ejs](src/views/index.ejs) — simple view
