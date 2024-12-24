import "./globals.css";


export const metadata = {
    title: "Audio Transcription Project",
    description: "",
    icons: {
        icon: '/images/logo.png',
    },
};

export default async function RootLayout({children}) {

    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
