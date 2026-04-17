"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Package,
  ChevronDown,
  Send,
  HelpCircle,
} from "lucide-react"
import { faqs } from "@/lib/data"
import { BirthdayBuddyBanner } from "@/components/birthday-buddy-banner"
import { cn } from "@/lib/utils"

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<null | {
    status: string
    location: string
  }>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking result
    if (trackingNumber.trim()) {
      setTrackingResult({
        status: "In Transit",
        location: "Distribution Center, Los Angeles, CA",
      })
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <div className="bg-linear-to-r from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
            How Can We Help?
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Find answers to common questions, track your order, or get in touch
            with our support team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {/* Birthday Buddy Banner */}
        <BirthdayBuddyBanner variant="compact" />

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: HelpCircle,
              title: "FAQ",
              desc: "Find quick answers",
              href: "#faq",
            },
            {
              icon: Package,
              title: "Track Order",
              desc: "Check your delivery",
              href: "#tracking",
            },
            {
              icon: Mail,
              title: "Contact Us",
              desc: "Get in touch",
              href: "#contact",
            },
          ].map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.title}
                href={link.href}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
              </a>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* FAQ Section */}
            <section id="faq" className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-border"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                    >
                      <span className="pr-4 font-medium text-foreground">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                          openFaq === index && "rotate-180"
                        )}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Order Tracking */}
            <section
              id="tracking"
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Package className="h-5 w-5 text-primary" />
                Track Your Order
              </h2>
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g., GA-123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 rounded-lg border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-linear-to-r from-primary to-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Track
                  </button>
                </div>
              </form>

              {trackingResult && (
                <div className="mt-4 rounded-xl bg-muted p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{trackingResult.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {trackingResult.location}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                    <div className="h-full w-2/3 rounded-full bg-linear-to-r from-primary to-accent" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Estimated delivery: 2-3 business days
                  </p>
                </div>
              )}
            </section>

            {/* Contact Form */}
            <section
              id="contact"
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <Mail className="h-5 w-5 text-primary" />
                Contact Us
              </h2>
              {formSubmitted ? (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-1 font-semibold text-green-800">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-green-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Subject *
                    </label>
                    <input
                      required
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full resize-none rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-accent py-3 font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:hello@giftaura.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      hello@giftaura.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a
                      href="tel:+233551234567"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +233 (55) 123-4567
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Mon-Fri, 9am-6pm GMT
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      UPSA, East Legon, Accra, Ghana
                      <br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-linear-to-r from-primary to-accent p-6 text-white">
              <h3 className="mb-2 font-semibold">Need Urgent Help?</h3>
              <p className="mb-4 text-sm opacity-90">
                Our support team is here to help you with any questions or
                concerns.
              </p>
              <a
                href="tel:+233244123456"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Phone className="h-4 w-4" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
