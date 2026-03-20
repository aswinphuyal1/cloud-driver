# ☁️ Cloud Driver - Modern Cloud Storage Solution

Cloud Driver is a high-performance, full-stack cloud storage platform built with **Next.js 15** and **Appwrite**. It offers a sleek, intuitive interface for managing files, organizing media, and sharing content—designed to rival industry leaders like Google Drive and Dropbox.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: Robust sign-up/sign-in flow with email verification and OTP security.
- 📁 **Advanced File Management**: 
  - Effortless drag-and-drop uploading via `react-dropzone`.
  - Categorization by file type (Documents, Images, Media, etc.).
  - Rename, delete, and download capabilities.
- 📊 **Dynamic Dashboard**: Visual storage overview with real-time charts powered by `Recharts`.
- 🔍 **Smart Search & Sort**: Global search bar and multi-criteria sorting (Name, Date, Size).
- 🤝 **Collaboration**: Securely share files with other registered users.
- 📱 **Fully Responsive**: Optimized for seamless use across desktops, tablets, and smartphones.
- 🔔 **Instant Feedback**: Beautiful toast notifications for all user actions.

---

## 📸 UI Showcase

<div align="center">
  <h3>User Dashboard & File Management</h3>
  <table width="100%">
    <tr>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 191657.png" alt="Dashboard" /></td>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 191711.png" alt="Files" /></td>
    </tr>
    <tr>
      <td align="center"><b>Sign-IN</b></td>
      <td align="center"><b>Sign-Up</b></td>
    </tr>
    <tr>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192221.png" alt="Media" /></td>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192348.png" alt="Upload" /></td>
    </tr>
    <tr>
      <td align="center"><b>OTP</b></td>
      <td align="center"><b>Dashboard Overview</b></td>
    </tr>
    <tr>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192409.png" alt="Auth" /></td>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192419.png" alt="Details" /></td>
    </tr>
    <tr>
      <td align="center"><b>Documents page</b></td>
      <td align="center"><b>Images page</b></td>
    </tr>
    <tr>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192430.png" alt="Search" /></td>
      <td width="50%"><img src="./images/Screenshot 2026-01-05 192447.png" alt="Profile" /></td>
    </tr>
    <tr>
      <td align="center"><b>Media page</b></td>
      <td align="center"><b>Others page</b></td>
    </tr>
  </table>
</div>

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Backend-as-a-Service**: [Appwrite](https://appwrite.io/) (Auth, Database, Storage)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)
- **File Handling**: [React Dropzone](https://react-dropzone.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Project
```bash
git clone <your-repository-url>
cd cloud-driver
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and populate it with your Appwrite project credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="your_endpoint"
NEXT_PUBLIC_APPWRITE_PROJECT="your_project_id"
NEXT_PUBLIC_APPWRITE_DATABASE="your_database_id"
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION="your_users_collection_id"
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION="your_files_collection_id"
NEXT_PUBLIC_APPWRITE_BUCKET="your_bucket_id"
NEXT_APPWRITE_KEY="your_secret_key"
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📁 Project Architecture

```
.
├── app/               # Next.js App Router (Auth & Protected Routes)
├── components/        # Reusable UI & Business Logic Components
├── constants/         # Application-wide constants & configurations
├── hooks/             # Custom React hooks (Toasts, etc.)
├── lib/               # Server Actions, Appwrite Config & Utilities
├── public/            # Static assets (Icons, Images)
└── types/             # TypeScript interfaces & types
```

---

<div align="center">
  Developed with ❤️ for the Developer Community
</div>

## Project Link

Project link: [live Link](https://cloud-driver-one.vercel.app/sign-in)
