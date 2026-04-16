'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Badge = 'starter' | 'pro' | 'master';

interface ReferralState {
  referralCount: number;
  badge: Badge;
  rewardUnlocked: boolean;
  rewardClaimed: boolean;
  selectedReward: 'hamper' | 'discount' | 'gift' | null;
  addReferral: () => void;
  claimReward: (reward: 'hamper' | 'discount' | 'gift') => void;
  getProgress: () => number;
  getBadgeTitle: () => string;
  resetRewards: () => void;
}

const REFERRAL_THRESHOLD = 5;

export const useReferralStore = create<ReferralState>()(
  persist(
    (set, get) => ({
      referralCount: 0,
      badge: 'starter',
      rewardUnlocked: false,
      rewardClaimed: false,
      selectedReward: null,

      addReferral: () => {
        set((state) => {
          const newCount = state.referralCount + 1;
          let newBadge: Badge = state.badge;
          let unlocked = state.rewardUnlocked;

          if (newCount >= 2 && newBadge === 'starter') {
            newBadge = 'pro';
          }
          if (newCount >= REFERRAL_THRESHOLD) {
            newBadge = 'master';
            unlocked = true;
          }

          return {
            referralCount: newCount,
            badge: newBadge,
            rewardUnlocked: unlocked,
          };
        });
      },

      claimReward: (reward) => {
        set({
          rewardClaimed: true,
          selectedReward: reward,
        });
      },

      getProgress: () => {
        const count = get().referralCount;
        return Math.min((count / REFERRAL_THRESHOLD) * 100, 100);
      },

      getBadgeTitle: () => {
        const badges: Record<Badge, string> = {
          starter: '🎉 Starter Gifter',
          pro: '🎁 Gift Pro',
          master: '👑 Gift Master',
        };
        return badges[get().badge];
      },

      resetRewards: () => {
        set({
          rewardClaimed: false,
          selectedReward: null,
        });
      },
    }),
    {
      name: 'giftaura-referral',
    }
  )
);
