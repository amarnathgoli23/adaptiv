// src/app/layout.tsx

import './globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Adaptiv.Me</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
