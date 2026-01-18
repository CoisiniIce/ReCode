# ReCode - Your Professional Coding Practice Companion

[中文版](./README_CN.md)

---

ReCode is a coding practice management tool designed for developers who pursue learning efficiency. It is not just a note-taking application, but a tool that integrates a high-quality editing experience with a scientific Spaced Repetition System (SRS).

💡 Note: This project currently runs in source code mode. To use it, follow the simple local deployment steps below.

## Features

- 🧠 **Improved SRS Algorithm**: Based on the classic Spaced Repetition System. The system dynamically calculates the best timing for your next review based on your self-assessed mastery (Level 0-5) and problem difficulty.
- 📝 **Built-in Monaco Editor**: Supports syntax highlighting for all major programming languages. It also features a dual-pane Markdown note system with real-time preview.
- 🔢 **LaTeX Support**: Supports mathematical formula rendering, making it easy to document complex algorithm complexity analysis, mathematical derivations, or geometric proofs.
- 📊 **Visualized Insights**: Intuitive mastery distribution charts, daily task focus, and learning progress tracking.

---

![Home](./public/images/home.png)
![Questions](./public/images/questions.png)
![Review](./public/images/review.png)

## Tech Stack

- **Framework**: `Next.js 16`
- **UI**: `Tailwind CSS 4`, `Framer Motion`
- **Database**: `SQLite` + `Prisma`
- **Core Components**: `Monaco Editor`, `React Markdown`, `KaTeX`, etc.

## Getting Started

### Prerequisites

1. `Node.js` (Recommended version 20.x or higher, I am using v24.12.0)
   - Download: [Node.js Official Website](https://nodejs.org/) - LTS Version
2. `Git`
   - Download: [Git Official Website](https://git-scm.com/)

### Installation & Execution - Quick Start

- Windows: Simply double-click the `start_windows.bat` file located in the root directory and the installation and startup process will be completed automatically.

---

- Mac / Linux: Execute in the terminal:

```bash
chmod +x start.sh && ./start.sh
```

Then double-click the `start_mac.sh` to execute. 

### Installation & Execution - Manual

#### 1. Clone the Repository (or download the ZIP directly)

```bash
git clone https://github.com/CoisiniIce/ReCode
cd ReCode
```

#### 2. Install Dependencies

```bash
npm install
```

Note: This may take some time. If the installation fails due to network issues, please consider using a mirror registry.

#### 3. Sync Database: Initialize Local `SQLite` and Generate Prisma Client

This project uses a local `SQLite` database. Run the following commands to generate the database files:

```bash
npx prisma generate
npx prisma db push
```

#### 4. Launch the Application

```bash
npm run dev
```

Once the above steps are successful, open your browser and visit `http://localhost:3000` to start your algorithm journey!

## FAQ

### Q1: Where is my data stored?

All your notes, code, and review progress are stored in the `prisma/dev.db` file at the project root.

- Backup: Simply copy the `dev.db` file to a safe location periodically.

- Migration: When switching computers, just copy the file to the `prisma/` directory in your new environment.

### Q2: Can I view the database content directly?

If you want to view the database schema, visit `prisma/schema.prisma`.

If you want to directly view or modify the underlying data, you can use the following command:

```bash
npx prisma studio
```

This will open a database manager in your browser. You can interact with the data directly (though manual editing is not recommended).

### Q3: What should I do if I encounter a `Module not found` error?

This is usually caused by an incomplete installation due to network issues. Try deleting the `node_modules` folder and running `npm install` again.

---

This project is personally developed, so errors or oversights may occur. If you encounter any issues, please feel free to let me know on GitHub.