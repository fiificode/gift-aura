'use client';

import { useState } from 'react';
import { Search, Mail, Phone, MapPin, Package, ChevronDown, Send, HelpCircle } from 'lucide-react';
import { faqs } from '@/lib/data';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';
import { cn } from '@/lib/utils';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<null | { status: string; location: string }>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking result
    if (trackingNumber.trim()) {
      setTrackingResult({
        status: 'In Transit',
        location: 'Distribution Center, Los Angeles, CA',
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Find answers to common questions, track your order, or get in touch with our support team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Birthday Buddy Banner */}
        <BirthdayBuddyBanner variant="compact" />

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: HelpCircle, title: 'FAQ', desc: 'Find quick answers', href: '#faq' },
            { icon: Package, title: 'Track Order', desc: 'Check your delivery', href: '#tracking' },
            { icon: Mail, title: 'Contact Us', desc: 'Get in touch', href: '#contact' },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.title}
                href={link.href}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <section id="faq" className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform',
                          openFaq === index && 'rotate-180'
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
            <section id="tracking" className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
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
                    className="rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Track
                  </button>
                </div>
              </form>

              {trackingResult && (
                <div className="mt-4 rounded-xl bg-muted p-4">
                  <div className="flex items-center gap-3 mb-3">
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
                  <div className="h-2 w-full rounded-full bg-muted-foreground/20 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated delivery: 2-3 business days
                  </p>
                </div>
              )}
            </section>

            {/* Contact Form */}
            <section id="contact" className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Us
              </h2>
              {formSubmitted ? (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-sm text-green-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <input
                        required
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject *</label>
                    <input
                      required
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-primary to-accent py-3 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a
                      href="mailto:hello@giftaura.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@giftaura.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <a
                      href="tel:+15551234567"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm PT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Gift Lane, Suite 100<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-6 text-white">
              <h3 className="font-semibold mb-2">Need Urgent Help?</h3>
              <p className="text-sm opacity-90 mb-4">
                Our support team is here to help you with any questions or concerns.
              </p>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
