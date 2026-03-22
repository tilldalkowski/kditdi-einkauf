export const metadata = {
  title: 'Dalkowski Einkaufszettel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
