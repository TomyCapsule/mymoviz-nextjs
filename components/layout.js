import Meta from './meta';
import Navbar from './navbar';

export default function Layout({children}){
    return(
        <>
            <Meta />
            <div className="min-h-screen">
                <Navbar/>
                <main>{children}</main>
            </div>
        </>
    )
}