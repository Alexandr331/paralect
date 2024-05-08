
import type { Metadata } from "next";
import Aside from "./components/Aside";
import { Container, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import './normalize.css'
import './globals.css'

export const metadata: Metadata = {
  title: "ArrowFlicks"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body >
          <MantineProvider>
            <main>
              <Aside />
              <Container pt={40} w={'100%'} mb={82}>
                {children} 
              </Container>
            </main> 
          </MantineProvider>
        </body>
      </html>
  );
}
