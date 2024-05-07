'use client'

import Link from "next/link";
import Image from "next/image";
import '../globals.css'
import { usePathname } from "next/navigation";

const Aside = () => {
  const pathname = usePathname()

    return (
      <aside className='aside' style={{backgroundColor: '#F2EBF9'}}>
        <Link style={{display: 'flex', marginBottom: '80px'}} href={'/'}>
          <Image priority height={36} width={179} src={'../assets/logo.svg'} alt="logo"/>
        </Link>
        <nav className='aside__nav-bar'>
          <Link className={`aside__nav-bar__link ${pathname === '/' ? 'active' : ''}`} href={'/'}>
            Movies
          </Link>
          <Link className={`aside__nav-bar__link ${pathname === '/watched' ? 'active' : ''}`} href={'/watched'}>
            Rated movies
          </Link>
        </nav>
      </aside>
    )
  }

  export default Aside