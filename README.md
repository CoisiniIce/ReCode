# ReCode - Your Professional Coding Practice Notebook

[中文版](./README_CN.md)

## Introduction

ReCode is a local-first coding practice management tool built with Next.js 16. It supports Markdown notes, code syntax highlighting, LaTeX math formula rendering, and mastery level management. Most importantly, it tracks your solved problems and intelligently schedules daily reviews based on the Spaced Repetition System (SRS).

💡 Note: This project currently runs in source code mode. To use it, follow the simple local deployment steps below.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. Node.js (Recommended version 20.x or higher, I use v24.12.0)
   - Download: [Node.js Official Website](https://nodejs.org/) - LTS Version
2. Git
   - Download: [Git Official Website](https://git-scm.com/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CoisiniIce/ReCode.git
cd recode
```

### 2. Install Dependencies

Open your terminal (Cmd / PowerShell / Git) in the project root and run:

```bash
npm install
```

Note: This may take some time. If the installation fails due to network issues, consider using a proxy or a mirror registry.

### 3. Initialize the Database

This project uses a local `SQLite` database. Run the following commands to generate the database files:

```bash
npx prisma generate
npx prisma db push
```

### 4. Launch the Application

```bash
npm run dev
```

Once successfully started, open your browser and visit `http://localhost:3000` to start your journey!

## FAQ

### Q1: Where is my data stored?
- All notes and problem data are stored in the `prisma/dev.db` file at the project root.

- Backup: Periodically copy this file to another location to complete a manual backup.

- Migration: When switching computers, just move the `dev.db` file and run `npm install` in the new environment.

### Q2: How can I view the database content directly?
If you want to visualize and manage your data tables, run:

```bash
npx prisma studio
```

This will open a database manager in your browser. You can interact with the data directly (though manual editing is not recommended).

### Q3: What should I do if I get a "Module not found" error?

This is usually caused by an incomplete installation due to network issues. Try deleting the `node_modules` folder and running `npm install` again.

---

This project is a personal development effort, so bugs or oversights may occur. If you encounter any issues, feel free to open an Issue on GitHub!