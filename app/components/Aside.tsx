'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import '../globals.css'
import classes from "../styles/Aside.module.css"
import { useState } from "react";
import { ActionIcon, CloseButton } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

const Aside = () => {
  const pathname = usePathname()

  const [toggledNav, setToggledNav] = useState(false)

    return (
      <>
        <aside className={`${classes.aside} ${toggledNav ? classes.active : ''}`}>
          <CloseButton c={'black'} bg={'transparent'} className={classes.close} onClick={() => {
            setToggledNav(false)
          }} />
          <Link className={classes.logo} href={'/'} onClick={() => setToggledNav(false)}>
            <Image priority height={36} width={179} src={'../assets/logo.svg'} alt="logo"/>
          </Link>
          <nav className={classes.aside__nav}>
            <Link className={`aside__nav-bar__link ${pathname === '/' ? 'active' : ''}`} href={'/'} onClick={() => setToggledNav(false)}>
              Movies
            </Link>
            <Link className={`aside__nav-bar__link ${pathname === '/watched' ? 'active' : ''}`} href={'/watched'} onClick={() => setToggledNav(false)}>
              Rated movies
            </Link>
          </nav>
        </aside>
      <ActionIcon hiddenFrom="sm" c={'black'} bg={'transparent'}  onClick={() => {
        setToggledNav(true)
      }}>
        <IconMenu2 />
      </ActionIcon>
      </>
    )
  }

  export default Aside