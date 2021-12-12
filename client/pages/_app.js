import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
        <body className="bg-gray-500">
            <Component {...pageProps} />
        </body>
        </>
    )

}

export default MyApp
