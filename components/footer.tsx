"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image
                  src="/logo.jpg"
                  alt="GiftAura"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
                GiftAura
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Making every gift magical. Creating smiles, one gift at a time.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4 text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4 text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md"
                aria-label="Twitter"
              >
                <svg
                  className="h-4 w-4 text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Candles"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Candles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Cards"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Hampers"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  hello@giftaura.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +233 (24) 412-3456
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  123 Gift Lane, UPSA, <br />
                  East Legon, Accra, Ghana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GiftAura. All rights reserved. Made
            with <span className="text-primary">♥</span> for gifters everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
