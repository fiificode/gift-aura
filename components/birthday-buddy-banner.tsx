'use client';

import { useState } from 'react';
import { Gift, Users, Copy, Check, X, Sparkles } from 'lucide-react';
import { useReferralStore } from '@/stores/referral-store';
import { cn } from '@/lib/utils';

interface BirthdayBuddyBannerProps {
  variant?: 'banner' | 'compact';
  className?: string;
}

export function BirthdayBuddyBanner({ variant = 'banner', className }: BirthdayBuddyBannerProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralCount = useReferralStore((state) => state.referralCount);
  const badge = useReferralStore((state) => state.badge);
  const rewardUnlocked = useReferralStore((state) => state.rewardUnlocked);
  const rewardClaimed = useReferralStore((state) => state.rewardClaimed);
  const addReferral = useReferralStore((state) => state.addReferral);
  const claimReward = useReferralStore((state) => state.claimReward);
  const progress = useReferralStore((state) => state.getProgress());
  const badgeTitle = useReferralStore((state) => state.getBadgeTitle());

  const referralLink = 'https://giftaura.com/ref/your-friend-code';
  const REFERRAL_THRESHOLD = 5;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateReferral = () => {
    addReferral();
  };

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'rounded-xl bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20 p-4',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{badgeTitle}</p>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {referralCount}/{REFERRAL_THRESHOLD} referrals
              {rewardUnlocked && !rewardClaimed && (
                <span className="ml-1 text-primary font-medium">- Reward unlocked! 🎉</span>
              )}
            </p>
          </div>
          {!rewardUnlocked && (
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-medium text-primary hover:underline"
            >
              Invite
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-accent p-6 sm:p-8 text-white',
          className
        )}
      >
        {/* Decorative elements */}
        <Sparkles className="absolute top-4 right-4 h-6 w-6 text-white/30" />
        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">
                  Birthday Buddy Bonus
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Invite Friends, Earn Rewards! 🎉
              </h3>
              <p className="text-sm opacity-90 max-w-md">
                Bring 5 friends and unlock a Surprise Hamper! Choose from 10% discount,
                or a free candle or card.
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-3">
              {/* Badge */}
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-sm font-medium">{badgeTitle}</span>
              </div>

              {/* Progress */}
              <div className="w-full sm:w-48">
                <div className="flex items-center justify-between text-xs mb-1 opacity-90">
                  <span>Progress</span>
                  <span>
                    {referralCount}/{REFERRAL_THRESHOLD} referrals
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/30">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {rewardUnlocked && !rewardClaimed ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
                >
                  Claim Your Reward! 🎁
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  Invite Friends
                </button>
              )}
            </div>
          </div>

          {/* Demo button for testing */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={handleSimulateReferral}
              className="text-xs text-white/70 hover:text-white transition-colors"
            >
              + Simulate referral (demo only)
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {rewardUnlocked && !rewardClaimed ? (
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-center text-xl font-bold text-foreground">
                  Reward Unlocked! 🎉
                </h3>
                <p className="text-center text-muted-foreground">
                  You&apos;ve reached {REFERRAL_THRESHOLD} referrals! Choose your reward:
                </p>

                <div className="grid gap-3">
                  <button
                    onClick={() => {
                      claimReward('hamper');
                      setShowModal(false);
                    }}
                    className="flex items-center gap-3 rounded-xl border-2 border-primary/20 p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      🎁
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Surprise Hamper</p>
                      <p className="text-sm text-muted-foreground">Valued at $50+</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      claimReward('discount');
                      setShowModal(false);
                    }}
                    className="flex items-center gap-3 rounded-xl border-2 border-primary/20 p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      💰
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">10% Discount</p>
                      <p className="text-sm text-muted-foreground">On your next order</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      claimReward('gift');
                      setShowModal(false);
                    }}
                    className="flex items-center gap-3 rounded-xl border-2 border-primary/20 p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                      🕯️
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Free Small Gift</p>
                      <p className="text-sm text-muted-foreground">Candle or card of choice</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : rewardClaimed ? (
              <div className="space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 mx-auto">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Reward Claimed!</h3>
                <p className="text-muted-foreground">
                  Check your email for details on how to redeem your reward.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-center text-xl font-bold text-foreground">
                  Invite Your Friends
                </h3>
                <p className="text-center text-muted-foreground">
                  Share your unique referral link and earn rewards!
                </p>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted p-3">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="text-center text-sm text-primary font-medium">
                    Link copied to clipboard!
                  </p>
                )}

                <div className="rounded-xl bg-muted p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    How it works:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>1. Share your unique link with friends</li>
                    <li>2. They sign up and make their first purchase</li>
                    <li>3. You earn 1 point per referral</li>
                    <li>4. At 5 points, unlock your reward!</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
