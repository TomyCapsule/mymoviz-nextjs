import Head from 'next/head';

export default function Meta(){
    return(
        <Head>
            <meta
                name="description"
                content={`Remaking MyMoviz with Next.js`}
            />
        </Head>
    )
}