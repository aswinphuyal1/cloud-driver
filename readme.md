# Cloud Driver

Cloud Driver is a full-stack cloud storage application built with Next.js and Appwrite. It provides a modern, user-friendly interface for uploading, managing, and sharing files, similar to services like Google Drive or Dropbox.

## UI Showcase

### User Views

|---:|:---|
| ![Dashboard](./images/Screenshot%202026-01-05%20191657.png) | ![Files](./images/Screenshot%202026-01-05%20191711.png) |


|---:|:---|
| ![Media](./images/Screenshot%202026-01-05%20192221.png) | ![Upload](./images/Screenshot%202026-01-05%20192348.png) |


|---:|:---|
| ![Auth](./images/Screenshot%202026-01-05%20192409.png) | ![Details](./images/Screenshot%202026-01-05%20192419.png) |


|---:|:---|
| ![Search](./images/Screenshot%202026-01-05%20192430.png) | ![Profile](./images/Screenshot%202026-01-05%20192447.png) |


## Features

*   **Authentication**: Secure user sign-up and sign-in with email and OTP verification.
*   **File Uploading**: Drag-and-drop file uploader with support for large files and progress indicators.
*   **Dashboard**: An overview of storage usage with a visual chart and a list of recently uploaded files.
*   **File Management**:
    *   View files organized by type (Documents, Images, Media, Others).
    *   Rename, delete, and download files.
    *   View detailed file information.
*   **File Sharing**: Share files with other registered users.
*   **Search & Sort**: Easily find files with a global search bar and sort them by name, date, or size.
*   **Responsive Design**: A seamless experience across desktop and mobile devices.
*   **Toast Notifications**: User-friendly feedback for actions like file uploads and errors.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Backend**: [Appwrite](https://appwrite.io/) (Authentication, Database, Storage)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **File Uploads**: [react-dropzone](https://react-dropzone.js.org/)

## Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── app/
│   ├── (auth)/         # Authentication routes (sign-in, sign-up)
│   ├── (root)/         # Protected routes after login
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Reusable UI components from shadcn/ui
│   ├── Actiondropdown.tsx # Component for file actions
│   ├── AuthForm.tsx    # Sign-in/Sign-up form
│   ├── Chart.tsx       # Storage usage chart
│   ├── Fileuploader.tsx# File upload component
│   └── ...
├── lib/
│   ├── actions/        # Server Actions for Appwrite
│   ├── appwrite/       # Appwrite client configuration
│   └── utils.ts        # Utility functions
├── constants/
│   └── index.ts        # Application constants
├── hooks/
│   └── use-toast.ts    # Custom hook for toast notifications
├── public/
│   └── assets/         # Static assets like icons and images
└── ...
```

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm, yarn, or pnpm
*   An active [Appwrite](https://appwrite.io/) project.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd cloud-driver
```

### 2. Install dependencies

```bash
npm install
```


### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.