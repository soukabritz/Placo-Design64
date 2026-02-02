// Completely minimal layout - no imports at all
export const metadata = {
  title: "Placo Design 64",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
