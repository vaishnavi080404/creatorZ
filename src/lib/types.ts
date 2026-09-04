export type TierCategory = "Alpha" | "Beta" | "Gamma";

export interface VerifiedPortfolioItem {
  id: string;
  campaignId: string;
  brandName: string;
  brandLogo: string;
  category: "Tech" | "Skincare" | "Fitness" | "FMCG" | "Comedy" | "Fashion" | "Finance";
  format: "Dedicated Reel" | "Integrated Skit" | "Story Series" | "UGC Ad";
  deliverableUrl: string;
  thumbnailUrl: string;
  approvedDate: string;
  contractValue: number;
  outcomeMetrics: {
    views: number;
    engagementRate: number;
    likes: number;
    comments: number;
  };
  clientReview?: {
    rating: number;
    comment: string;
    brandContact: string;
  };
}

export interface CreatorProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  category: string;
  tier: TierCategory;
  score: number; // 0 - 100
  reach: number;
  avgViews: number;
  engagementRate: number;
  startingRate: number;
  responseTime: string;
  onTimeDeliveryRate: number;
  languages: string[];
  location: string;
  verified: boolean;
  openToBrands: boolean;
  provenFormats: string[];
  autoPortfolio: VerifiedPortfolioItem[];
  reelPreviewUrl: string;
}

export interface OpenBrief {
  id: string;
  brandName: string;
  brandLogo: string;
  brandIndustry: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deliverablesRequired: string;
  deadline: string;
  applicantsCount: number;
  guidelines: string[];
  targetAudience: string;
  sampleHook: string;
}

export interface PitchReel {
  id: string;
  briefId: string;
  briefTitle: string;
  brandName: string;
  creatorUsername: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTier: TierCategory;
  creatorScore: number;
  creatorCategory: string;
  creatorAvgViews: number;
  creatorEngagement: number;
  creatorReach: number;
  proposedRate: number;
  deliveryDays: number;
  videoUrl: string;
  videoDurationSec: number;
  hookText: string;
  pitchSummary: string;
  submittedAt: string;
  status: "pending" | "shortlisted" | "passed" | "offered";
}

export interface StructuredOffer {
  id: string;
  campaignTitle: string;
  brandName: string;
  brandLogo: string;
  creatorUsername: string;
  creatorName: string;
  creatorAvatar: string;
  deliverables: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  deadline: string;
  revisionsIncluded: number;
  status: "pending" | "accepted" | "countered" | "declined";
  sentAt: string;
  contractTerms: string[];
}

export interface VideoTimestampPin {
  id: string;
  timestampSec: number;
  authorName: string;
  authorRole: "Brand" | "Creator";
  comment: string;
  resolved: boolean;
  createdAt: string;
}

export interface VideoDraft {
  id: string;
  version: "v1" | "v2" | "Final Approved";
  videoUrl: string;
  uploadedAt: string;
  fileSizeMb: number;
  pins: VideoTimestampPin[];
}

export interface MilestoneStep {
  stage: number;
  name: string;
  status: "completed" | "active" | "pending";
  description: string;
  date?: string;
  payoutPercent: number;
  refundPercent: number;
}

export interface OrderRoomData {
  id: string;
  campaignTitle: string;
  brandName: string;
  brandLogo: string;
  creatorUsername: string;
  creatorName: string;
  creatorAvatar: string;
  contractTotal: number;
  currentMilestoneStage: number; // 1 to 6
  milestones: MilestoneStep[];
  drafts: VideoDraft[];
}
