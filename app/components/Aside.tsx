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
        <aside className={`${classes.aside} ${toggledNav ? classes.activePopover : ''}`}>
          <CloseButton pos={'fixed'} top={10} right={10} size={"xl"} c={'#9854F6'} bg={'transparent'} className={classes.close} onClick={() => {
            setToggledNav(false)
          }} />
          <Link className={classes.logo} href={'/'} onClick={() => setToggledNav(false)}>
            <Image priority height={36} width={179} src={'../assets/logo.svg'} alt="logo"/>
          </Link>
          <nav className={classes.asideNav}>
            <Link className={`${classes.asideNavbarLink} ${pathname === '/' ? classes.activeLink : ''}`} href={'/'} onClick={() => setToggledNav(false)}>
              Movies
            </Link>
            <Link className={`${classes.asideNavbarLink} ${pathname === '/watched' ? classes.activeLink : ''}`} href={'/watched'} onClick={() => setToggledNav(false)}>
              Rated movies
            </Link>
          </nav>
        </aside>
        <ActionIcon mt={20} ml={'auto'} mr={20} size={'xl'} className={classes.open} hiddenFrom="sm" c={'black'} bg={'transparent'}  onClick={() => {
              setToggledNav(true)
            }}>
          <IconMenu2 size={36} color="#9854F6"/>
        </ActionIcon>
      </>
    )
  }

  export default Aside