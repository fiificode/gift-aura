'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, CreditCard, Package, Truck, Sparkles, Gift, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useReferralStore } from '@/stores/referral-store';
import { BirthdayBuddyBanner } from '@/components/birthday-buddy-banner';
import { cn } from '@/lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const rewardClaimed = useReferralStore((state) => state.rewardClaimed);
  const selectedReward = useReferralStore((state) => state.selectedReward);

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const subtotal = getTotalPrice();
  const discount = rewardClaimed && selectedReward === 'discount' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some items to your cart before checking out
        </p>
        <Link
          href="/products"
          className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {[
                { id: 'shipping', label: 'Shipping', icon: Truck },
                { id: 'payment', label: 'Payment', icon: CreditCard },
                { id: 'review', label: 'Review', icon: Package },
              ].map((s, i) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted =
                  (step === 'payment' && s.id === 'shipping') ||
                  (step === 'review' && (s.id === 'shipping' || s.id === 'payment'));

                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-full px-4 py-2',
                        isActive && 'bg-primary text-white',
                        isCompleted && 'bg-green-500 text-white',
                        !isActive && !isCompleted && 'bg-white text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium hidden sm:inline">
                        {s.label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className={cn(
                          'h-0.5 w-8',
                          isCompleted ? 'bg-green-500' : 'bg-border'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Form */}
            {step === 'shipping' && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Street Address *
                    </label>
                    <input
                      required
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="123 Main St, Apt 4B"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City *</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        ZIP Code *
                      </label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zip: e.target.value })
                        }
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="94102"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-accent py-3 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Mock */}
            {step === 'payment' && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <div className="rounded-xl border-2 border-primary bg-primary/5 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Credit / Debit Card</p>
                        <p className="text-sm text-muted-foreground">
                          Mock payment - no real charges
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card number (mock)"
                        className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue="4242 4242 4242 4242"
                        readOnly
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                          defaultValue="12/25"
                          readOnly
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                          defaultValue="123"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('shipping')}
                      className="flex-1 rounded-full border border-input py-3 font-medium hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={isProcessing}
                      className="flex-[2] rounded-full bg-gradient-to-r from-primary to-accent py-3 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${total.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="rounded-2xl bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed! 🎉</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order! We&apos;ve sent a confirmation email to{' '}
                  {shippingInfo.email || 'your email'}.
                </p>
                <div className="rounded-xl bg-muted p-4 mb-6 text-left">
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-semibold">#GA-{Date.now()}</p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {step !== 'success' && (
              <>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                          {item.product.category === 'Candles' && '🕯️'}
                          {item.product.category === 'Cards' && '💌'}
                          {item.product.category === 'Hampers' && '🎁'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Birthday Buddy Upsell */}
                {!rewardClaimed && <BirthdayBuddyBanner variant="compact" />}

                {rewardClaimed && selectedReward === 'discount' && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <Gift className="h-5 w-5" />
                      <span className="font-medium">10% Discount Applied!</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Your Birthday Buddy Bonus reward has been applied to this order.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
