my-node-express-app/

### installing

    npm install node

## for generating prisma

npx prisma generate

### starting development

npm run dev

### for migrating

npx prisma migrate dev

│
├── node_modules/ # Installed dependencies
├── prisma/ # Prisma schema and migration files
│ ├── schema.prisma # Prisma schema file for database setup
├── src/ # Source code for the application
│ ├── controllers/ # Contains all the controller files for handling requests
│ │ └── postController.ts # Controller for managing posts
│ ├── routes/ # Contains all route definitions
│ │ └── postRoutes.ts # Routes for managing post endpoints
│ ├── schemas/ # Validation schemas (e.g., Zod)
│ │ └── postSchema.ts # Schema to validate request data for creating/updating posts
│ ├── app.ts # Entry point of the application (Express app setup)
│ └── ... # Other files as needed
├── .env # Environment variables (e.g., DB connection string)
├── .gitignore # Files/folders to ignore in version control
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
├── tsconfig.json # TypeScript configuration (if using TypeScript)
└── ...
