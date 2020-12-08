import Link from 'next/link';
import s from './Navbar.module.css';
import Logo from '../../icons/Logo';
import { useUser } from '../../UserContext';

const Navbar = () => {
  const { user, signOut } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 justify-evenly items-center justify-center text-xl">
            {/* <nav className="space-x-2 ml-6 hidden lg:block"> */}
            <Link href="/signup">
              <a className={s.link}>Sign Up</a>
            </Link>
            {user ? (
              <Link href="#">
                <a className={s.link} onClick={() => signOut()}>Log Out</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Log In</a>
              </Link>
            )}

            <Link href="/about">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>

            <Link href="/">
              <a className={s.link}>Products</a>
            </Link>
            <Link href="/account">
              <a className={s.link}>Account</a>
            </Link>
            {/* </nav> */}
          </div>

          {/* <div className="flex flex-1 justify-end space-x-8">
            
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
