import { createClient } from './supabase/client';

export type Badge = 'starter' | 'pro' | 'master';
export type RewardType = 'surprise_hamper' | 'discount_10' | 'free_gift';

export interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  canClaimReward: boolean;
  hasClaimedReward: boolean;
  badge: Badge;
  progress: number;
  rewardType: RewardType | null;
  referralCode: string | null;
}

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
         !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';
};

class ReferralService {
  private supabase = createClient();
  private REFERRAL_THRESHOLD = 5;
  private mockMode = !isSupabaseConfigured();

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async getProfile(userId: string) {
    if (this.mockMode) {
      // Return mock profile in dev mode
      return {
        id: userId,
        referral_code: `buddy${userId.slice(0, 8)}`,
        full_name: null,
        username: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Supabase profiles table error, falling back to mock:', error.message);
        return {
          id: userId,
          referral_code: `buddy${userId.slice(0, 8)}`,
          full_name: null,
          username: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return data;
    } catch (e) {
      console.warn('Supabase connection error, using mock profile');
      return {
        id: userId,
        referral_code: `buddy${userId.slice(0, 8)}`,
        full_name: null,
        username: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }

  async createProfile(userId: string, fullName?: string) {
    if (this.mockMode) {
      // Return mock profile in dev mode
      return {
        id: userId,
        referral_code: `buddy${userId.slice(0, 8)}`,
        full_name: fullName || null,
        username: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    const { data, error } = await this.supabase
      .from('profiles')
      .insert({ id: userId, full_name: fullName })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getReferralStats(userId: string): Promise<ReferralStats> {
    // Get profile for referral code
    const profile = await this.getProfile(userId);

    // Return mock stats in dev mode
    if (this.mockMode) {
      return {
        totalReferrals: 0,
        completedReferrals: 0,
        pendingReferrals: 0,
        canClaimReward: false,
        hasClaimedReward: false,
        badge: 'starter',
        progress: 0,
        rewardType: null,
        referralCode: profile?.referral_code || `buddy${userId.slice(0, 8)}`,
      };
    }

    try {
      // Get stats from database function
      const { data: stats, error: statsError } = await this.supabase
        .rpc('get_referral_stats', { user_uuid: userId });

      if (statsError) {
        console.warn('Supabase RPC error, using fallback calculation:', statsError.message);
        // Fallback to manual count
        const { data: referrals, error: refError } = await this.supabase
          .from('referrals')
          .select('status')
          .eq('referrer_id', userId);

        if (refError) throw refError;

        const completed = referrals?.filter(r => r.status === 'completed').length || 0;
        const total = referrals?.length || 0;

        // Check if reward claimed
        const { data: reward } = await this.supabase
          .from('referral_rewards')
          .select('reward_type')
          .eq('user_id', userId)
          .maybeSingle();

        const badge = this.calculateBadge(completed);

        return {
          totalReferrals: total,
          completedReferrals: completed,
          pendingReferrals: total - completed,
          canClaimReward: completed >= this.REFERRAL_THRESHOLD && !reward,
          hasClaimedReward: !!reward,
          badge,
          progress: Math.min((completed / this.REFERRAL_THRESHOLD) * 100, 100),
          rewardType: reward?.reward_type || null,
          referralCode: profile?.referral_code || null,
        };
      }

      // Check if reward claimed
      const { data: reward } = await this.supabase
        .from('referral_rewards')
        .select('reward_type')
        .eq('user_id', userId)
        .maybeSingle();

      const completed = stats?.[0]?.completed_referrals || 0;
      const badge = this.calculateBadge(completed);

      return {
        totalReferrals: stats?.[0]?.total_referrals || 0,
        completedReferrals: completed,
        pendingReferrals: stats?.[0]?.pending_referrals || 0,
        canClaimReward: stats?.[0]?.can_claim_reward && !stats?.[0]?.has_claimed_reward,
        hasClaimedReward: stats?.[0]?.has_claimed_reward || !!reward,
        badge,
        progress: Math.min((completed / this.REFERRAL_THRESHOLD) * 100, 100),
        rewardType: reward?.reward_type || null,
        referralCode: profile?.referral_code || null,
      };
    } catch (e) {
      console.warn('Supabase error in getReferralStats, using mock data:', e);
      // Return mock stats on any error
      return {
        totalReferrals: 0,
        completedReferrals: 0,
        pendingReferrals: 0,
        canClaimReward: false,
        hasClaimedReward: false,
        badge: 'starter',
        progress: 0,
        rewardType: null,
        referralCode: profile?.referral_code || `buddy${userId.slice(0, 8)}`,
      };
    }
  }

  private calculateBadge(completed: number): Badge {
    if (completed >= this.REFERRAL_THRESHOLD) return 'master';
    if (completed >= 2) return 'pro';
    return 'starter';
  }

  getBadgeTitle(badge: Badge): string {
    const badges: Record<Badge, string> = {
      starter: '🎉 Starter Gifter',
      pro: '🎁 Gift Pro',
      master: '👑 Gift Master',
    };
    return badges[badge];
  }

  async addReferral(referrerId: string, referredEmail: string) {
    // Check if referral already exists
    const { data: existing } = await this.supabase
      .from('referrals')
      .select('id')
      .eq('referrer_id', referrerId)
      .eq('referred_email', referredEmail)
      .maybeSingle();

    if (existing) {
      throw new Error('Referral already exists for this email');
    }

    const { data, error } = await this.supabase
      .from('referrals')
      .insert({
        referrer_id: referrerId,
        referred_email: referredEmail,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async completeReferral(referredEmail: string, referredUserId: string) {
    const { data, error } = await this.supabase
      .from('referrals')
      .update({
        referred_user_id: referredUserId,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('referred_email', referredEmail)
      .eq('status', 'pending')
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async claimReward(userId: string, rewardType: RewardType) {
    // Check if already claimed
    const { data: existing } = await this.supabase
      .from('referral_rewards')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      throw new Error('Reward already claimed');
    }

    // Check if user has enough referrals
    const stats = await this.getReferralStats(userId);
    if (!stats.canClaimReward) {
      throw new Error('Not enough referrals to claim reward');
    }

    // Insert reward
    const { data, error } = await this.supabase
      .from('referral_rewards')
      .insert({
        user_id: userId,
        reward_type: rewardType,
        status: 'claimed',
      })
      .select()
      .single();

    if (error) throw error;

    // Update referral status to reward_claimed
    await this.supabase
      .from('referrals')
      .update({ status: 'reward_claimed' })
      .eq('referrer_id', userId)
      .eq('status', 'completed');

    return data;
  }

  async getReferrals(userId: string) {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  generateReferralLink(referralCode: string): string {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/?ref=${referralCode}`;
  }
}

export const referralService = new ReferralService();
