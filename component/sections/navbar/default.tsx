/* eslint-disable @typescript-eslint/no-explicit-any */
// Navbar.tsx
"use client";

import { type VariantProps } from "class-variance-authority";
import { LogOut, Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { siteConfig } from "@/config/site";

import LaunchUI from "../../logos/launch-ui";
import { Button, buttonVariants } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { cn } from "@/component/lib/utils";
import NextLearnLogo from "@/component/logos/next-learn-logo";
import AuthModal from "@/component/Auth/AuthModal";

// ⚠️ adjust these two import paths to match your actual redux folder layout
import { useLazyLogOutQuery } from "@/redux/auth/authApi";
import { userLoggedOut } from "@/redux/auth/authSlice";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface AuthUser {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: { url?: string };
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  // guest actions — only used when nobody is logged in
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <NextLearnLogo className="size-8" />,
  name = "Next Learn",
  homeUrl = siteConfig.url,
  mobileLinks = [
    { text: "Getting Started", href: siteConfig.url },
    { text: "Components", href: siteConfig.url },
    { text: "Documentation", href: siteConfig.url },
  ],
  actions = [
    { text: "Log in", href: "/Auth/Login", isButton: false },
    {
      text: "Get Started",
      href: "/sign-up",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  // real user pulled from the auth slice (populated by loadUser / refreshToken
  // on app init, and by login/social-auth on sign-in)
  const user = useSelector((state: any) => state.auth.user as AuthUser | "");
  const isLoggedIn = Boolean(user && typeof user === "object" && user._id);

  const [logOut] = useLazyLogOutQuery();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // --- auth modal state ---
  const [authOpen, setAuthOpen] = useState(false);
  const [authRoute, setAuthRoute] = useState("Login");

  const openAuth = (route: string) => {
    setAuthRoute(route);
    setAuthOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logOut();
    dispatch(userLoggedOut());
    router.push("/login");
  };

  const initials =
    typeof user === "object" && user.name
      ? user.name
          .trim()
          .split(/\s+/)
          .map((part) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "?";

  const loggedInLinks: NavbarLink[] =
    typeof user === "object" && user.role === "admin"
      ? [
          { text: "My Learning", href: "/my-courses" },
          { text: "Admin Dashboard", href: "/admin" },
          { text: "Profile", href: "/profile" },
        ]
      : [
          { text: "My Learning", href: "/my-courses" },
          { text: "Profile", href: "/profile" },
        ];

  return (
    <header className={cn("border-border/80 sticky top-0 z-50 -mb-4 border-b px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/70 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={homeUrl}
              className="text-foreground flex items-center gap-2 text-xl font-semibold"
            >
              {logo}
              <span className="font-serif">{name}</span>
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            {isLoggedIn && typeof user === "object" ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full"
                >
                  {user.avatar?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar.url}
                      alt={user.name || "User avatar"}
                      className="size-9 rounded-full border object-cover"
                    />
                  ) : (
                    <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-full text-sm font-medium">
                      {initials}
                    </span>
                  )}
                  <span className="text-foreground hidden text-sm font-medium md:block">
                    {user.name}
                  </span>
                </button>

                {menuOpen && (
                  <div className="bg-background absolute right-0 mt-2 w-56 rounded-md border shadow-lg">
                    <div className="border-b px-4 py-3">
                      <p className="text-foreground truncate text-sm font-medium">{user.name}</p>
                      <p className="text-muted-foreground truncate text-xs">{user.email}</p>
                    </div>
                    <nav className="py-1">
                      {loggedInLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-foreground hover:bg-muted flex items-center gap-2 px-4 py-2 text-sm"
                        >
                          <UserIcon className="size-4" />
                          {link.text}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-foreground hover:bg-muted flex w-full items-center gap-2 px-4 py-2 text-left text-sm"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            ) : (
              actions.map((action) =>
                action.isButton ? (
                  <Button
                    key={`${action.href}-${action.text}`}
                    variant={action.variant || "default"}
                    className="shadow-sm"
                    onClick={() => openAuth("Sign-Up")}
                  >
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </Button>
                ) : (
                  <button
                    key={`${action.href}-${action.text}`}
                    type="button"
                    onClick={() => openAuth("Login")}
                    className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:block"
                  >
                    {action.text}
                  </button>
                ),
              )
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-semibold"
                  >
                    <span className="font-serif">{name}</span>
                  </a>

                  {isLoggedIn && typeof user === "object" ? (
                    <>
                      <div className="flex items-center gap-3 border-b pb-4">
                        {user.avatar?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.avatar.url}
                            alt={user.name || "User avatar"}
                            className="size-10 rounded-full border object-cover"
                          />
                        ) : (
                          <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full text-sm font-medium">
                            {initials}
                          </span>
                        )}
                        <div>
                          <p className="text-foreground text-sm font-medium">{user.name}</p>
                          <p className="text-muted-foreground text-xs">{user.email}</p>
                        </div>
                      </div>
                      {loggedInLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {link.text}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-foreground text-left"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    mobileLinks.map((link) => (
                      <a
                        key={`${link.href}-${link.text}`}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.text}
                      </a>
                    ))
                  )}

                  {!isLoggedIn && (
                    <button
                      type="button"
                      onClick={() => openAuth("Login")}
                      className="text-muted-foreground hover:text-foreground text-left"
                    >
                      Log in
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>

      <AuthModal
        open={authOpen}
        setOpen={setAuthOpen}
        route={authRoute}
        setRoute={setAuthRoute}
      />
    </header>
  );
}