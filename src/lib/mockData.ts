import { CreatorProfile, OpenBrief, PitchReel, StructuredOffer, OrderRoomData } from "./types";

export const MOCK_CREATORS: CreatorProfile[] = [
  {
    id: "cr-1",
    username: "alex_kumar",
    name: "Alex Kumar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Tech teardowns, consumer electronics, and satirical product sketches. 98% on-time delivery rate with rigorous honesty.",
    category: "Tech & Consumer Goods",
    tier: "Alpha",
    score: 94,
    reach: 380000,
    avgViews: 64200,
    engagementRate: 5.8,
    startingRate: 25000,
    responseTime: "< 2 Hours",
    onTimeDeliveryRate: 98,
    languages: ["English", "Hindi"],
    location: "Bengaluru, India",
    verified: true,
    openToBrands: true,
    provenFormats: [
      "Workplace Comparison Skits",
      "Objective 30-Day Teardowns",
      "Street Reaction Tests"
    ],
    reelPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4",
    autoPortfolio: [
      {
        id: "port-1",
        campaignId: "camp-boat",
        brandName: "Boat Audio",
        brandLogo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&auto=format&fit=crop&q=80",
        category: "Tech",
        format: "Dedicated Reel",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-43015-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Sep 14, 2026",
        contractValue: 35000,
        outcomeMetrics: {
          views: 84200,
          engagementRate: 6.2,
          likes: 4800,
          comments: 620
        },
        clientReview: {
          rating: 5,
          comment: "Alex delivered before the deadline and his comedy hook drove a 3.8x spike in product page clicks.",
          brandContact: "Marketing Director, Boat Audio"
        }
      },
      {
        id: "port-2",
        campaignId: "camp-prime",
        brandName: "Prime Hydration",
        brandLogo: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&auto=format&fit=crop&q=80",
        category: "FMCG",
        format: "Integrated Skit",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Aug 28, 2026",
        contractValue: 28000,
        outcomeMetrics: {
          views: 112000,
          engagementRate: 7.1,
          likes: 8900,
          comments: 1150
        },
        clientReview: {
          rating: 5,
          comment: "Fantastic conversion on the student launch angle. Verified milestone delivery completed smoothly.",
          brandContact: "Brand Lead, Prime India"
        }
      },
      {
        id: "port-3",
        campaignId: "camp-keychron",
        brandName: "Keychron India",
        brandLogo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80",
        category: "Tech",
        format: "UGC Ad",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-makeup-tutorial-video-41313-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Jul 19, 2026",
        contractValue: 25000,
        outcomeMetrics: {
          views: 49000,
          engagementRate: 5.4,
          likes: 3100,
          comments: 410
        },
        clientReview: {
          rating: 5,
          comment: "Great production quality. Audio was super crisp and sound design was spot on.",
          brandContact: "Product Manager, Keychron"
        }
      }
    ]
  },
  {
    id: "cr-2",
    username: "priya_skincare",
    name: "Dr. Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "Dermatology resident breaking down ingredient science, chemical peels, and real skin transformations without beauty filters.",
    category: "Skincare & Wellness",
    tier: "Alpha",
    score: 91,
    reach: 290000,
    avgViews: 52000,
    engagementRate: 6.4,
    startingRate: 20000,
    responseTime: "< 1 Hour",
    onTimeDeliveryRate: 100,
    languages: ["English", "Hindi"],
    location: "Mumbai, India",
    verified: true,
    openToBrands: true,
    provenFormats: [
      "Ingredient Microscope Analysis",
      "Myth Busting vs. Clinical Facts",
      "7-Day Split-Face Time-Lapse"
    ],
    reelPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-makeup-tutorial-video-41313-large.mp4",
    autoPortfolio: [
      {
        id: "port-4",
        campaignId: "camp-plum",
        brandName: "Plum Goodness",
        brandLogo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80",
        category: "Skincare",
        format: "Dedicated Reel",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-makeup-tutorial-video-41313-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Sep 02, 2026",
        contractValue: 24000,
        outcomeMetrics: {
          views: 96000,
          engagementRate: 6.8,
          likes: 6200,
          comments: 940
        },
        clientReview: {
          rating: 5,
          comment: "High scientific credibility. We saw a record low customer acquisition cost on our Niacinamide serum ad.",
          brandContact: "Growth Lead, Plum Goodness"
        }
      },
      {
        id: "port-5",
        campaignId: "camp-minimalist",
        brandName: "Be Minimalist",
        brandLogo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&auto=format&fit=crop&q=80",
        category: "Skincare",
        format: "UGC Ad",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-makeup-tutorial-video-41313-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Aug 15, 2026",
        contractValue: 20000,
        outcomeMetrics: {
          views: 68000,
          engagementRate: 5.9,
          likes: 4100,
          comments: 520
        },
        clientReview: {
          rating: 5,
          comment: "Priya is our go-to for science-backed skincare briefs. Flawless communication.",
          brandContact: "Campaign Manager, Minimalist"
        }
      }
    ]
  },
  {
    id: "cr-3",
    username: "karthik_fitness",
    name: "Karthik R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Calisthenics coach and natural bodybuilding advocate. South India focus with high regional engagement across Tamil & English.",
    category: "Fitness & Nutrition",
    tier: "Beta",
    score: 82,
    reach: 140000,
    avgViews: 38500,
    engagementRate: 6.9,
    startingRate: 14000,
    responseTime: "< 4 Hours",
    onTimeDeliveryRate: 96,
    languages: ["Tamil", "English"],
    location: "Chennai, India",
    verified: true,
    openToBrands: true,
    provenFormats: [
      "No-Equipment Home Workouts",
      "Macros Breakdown on Cheap Budgets",
      "Form Check Critique"
    ],
    reelPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-walking-in-a-gym-42861-large.mp4",
    autoPortfolio: [
      {
        id: "port-6",
        campaignId: "camp-muscleblaze",
        brandName: "MuscleBlaze",
        brandLogo: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&auto=format&fit=crop&q=80",
        category: "Fitness",
        format: "Dedicated Reel",
        deliverableUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-walking-in-a-gym-42861-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
        approvedDate: "Aug 20, 2026",
        contractValue: 16000,
        outcomeMetrics: {
          views: 45000,
          engagementRate: 7.2,
          likes: 3800,
          comments: 490
        },
        clientReview: {
          rating: 5,
          comment: "Authentic delivery and very strong response from the Tamil Nadu fitness community.",
          brandContact: "Influencer Marketing Lead, MuscleBlaze"
        }
      }
    ]
  },
  {
    id: "cr-4",
    username: "ananya_foodie",
    name: "Ananya Ghosh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bio: "Budget street food explorer & hostel cooking hacks. High energy storytelling in Hindi & Bengali.",
    category: "Food & D2C FMCG",
    tier: "Beta",
    score: 79,
    reach: 98000,
    avgViews: 29000,
    engagementRate: 7.8,
    startingRate: 10000,
    responseTime: "< 2 Hours",
    onTimeDeliveryRate: 95,
    languages: ["Hindi", "Bengali", "English"],
    location: "Kolkata, India",
    verified: true,
    openToBrands: true,
    provenFormats: [
      "10-Minute Mug/Kettle Recipes",
      "Blind Local vs. Packaged Taste Test",
      "Late Night Cravings Hacks"
    ],
    reelPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-fresh-salad-ingredients-falling-into-a-bowl-43615-large.mp4",
    autoPortfolio: []
  },
  {
    id: "cr-5",
    username: "rohan_ugc",
    name: "Rohan V.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Specialist UGC video ad creator for D2C brands. High hook rates, raw unfiltered iPhone aesthetic that converts into ROAS.",
    category: "UGC Ad Specialist",
    tier: "Gamma",
    score: 58,
    reach: 18000,
    avgViews: 12400,
    engagementRate: 8.2,
    startingRate: 6000,
    responseTime: "< 1 Hour",
    onTimeDeliveryRate: 100,
    languages: ["English", "Hindi"],
    location: "Delhi NCR, India",
    verified: true,
    openToBrands: true,
    provenFormats: [
      "Unfiltered Unboxing Hook",
      "Problem-Agitate-Solve UGC",
      "3 Reasons Why I Switched"
    ],
    reelPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4",
    autoPortfolio: []
  }
];

export const MOCK_OPEN_BRIEFS: OpenBrief[] = [
  {
    id: "brief-1",
    brandName: "BeastLife Nutrition",
    brandLogo: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&auto=format&fit=crop&q=80",
    brandIndustry: "Health & Fitness",
    title: "Summer 100% Whey Isolate Launch — Video Pitch Auditions",
    description: "Looking for 5 authentic fitness & lifestyle creators to produce 1 dedicated Instagram Reel showcasing our unflavored isolate with zero chalky residue. We prioritize strong 3-second hooks and realistic kitchen demonstrations over gym flexing.",
    category: "Fitness & Nutrition",
    budget: 25000,
    deliverablesRequired: "1x Dedicated Instagram Reel (30-45s) + 2x Stories",
    deadline: "Oct 28, 2026",
    applicantsCount: 14,
    guidelines: [
      "Must show product texture and solubility in cold water without shaker clumps.",
      "Include custom tracking coupon code in caption and on-screen overlay.",
      "Clear call to action directing viewers to beastlife.in."
    ],
    targetAudience: "Gymgoers, working professionals, college students aged 18-32 in Tier 1 & 2 Indian cities.",
    sampleHook: "Stop drinking protein shakes that taste like chalk powder..."
  },
  {
    id: "brief-2",
    brandName: "Plum Goodness",
    brandLogo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80",
    brandIndustry: "Skincare & Beauty",
    title: "Rice Water & Niacinamide Brightening Serum Campaign",
    description: "Seeking skincare creators & dermatological influencers for honest educational reels. Show texture, quick absorption, and explain the science of Japanese rice water + 10% niacinamide.",
    category: "Skincare & Wellness",
    budget: 30000,
    deliverablesRequired: "1x Dedicated Reel (45-60s) with scientific breakdown",
    deadline: "Nov 05, 2026",
    applicantsCount: 22,
    guidelines: [
      "No heavy beauty filters or artificial smoothing — natural skin texture required.",
      "Demonstrate dropper application and fast 10-second absorption on hand/cheek.",
      "Tag @plumgoodness with #CleanSkincareScience."
    ],
    targetAudience: "Women and men aged 19-35 dealing with acne spots, hyperpigmentation, or dull skin.",
    sampleHook: "If your dark spots refuse to fade, stop scrubbing your barrier and watch this..."
  },
  {
    id: "brief-3",
    brandName: "Boat Audio",
    brandLogo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&auto=format&fit=crop&q=80",
    brandIndustry: "Consumer Electronics",
    title: "Airdopes Ultra ANC — Noise Cancellation Street Challenge",
    description: "We are hiring tech & comedy creators to test our 38dB Active Noise Cancellation in the loudest real-world Indian settings (local trains, busy fish markets, loud traffic).",
    category: "Tech & Consumer Goods",
    budget: 35000,
    deliverablesRequired: "1x Reel + 2x Stories with audio comparison",
    deadline: "Nov 12, 2026",
    applicantsCount: 31,
    guidelines: [
      "Record binaural audio switch: ANC Off (traffic noise) vs. ANC On (total silence).",
      "Fast-paced editing, maximum 30 seconds length.",
      "Mention 50-hour total battery life and ₹1,999 launch price."
    ],
    targetAudience: "Commuters, college students, tech enthusiasts across Pan-India.",
    sampleHook: "I took these ₹1,999 earbuds into the loudest market in Mumbai..."
  }
];

export const MOCK_PITCH_REELS: PitchReel[] = [
  {
    id: "pitch-1",
    briefId: "brief-1",
    briefTitle: "Summer 100% Whey Isolate Launch",
    brandName: "BeastLife Nutrition",
    creatorUsername: "alex_kumar",
    creatorName: "Alex Kumar",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    creatorTier: "Alpha",
    creatorScore: 94,
    creatorCategory: "Tech & Satirical Skits",
    creatorAvgViews: 64200,
    creatorEngagement: 5.8,
    creatorReach: 380000,
    proposedRate: 22000,
    deliveryDays: 3,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4",
    videoDurationSec: 42,
    hookText: "Stop drinking protein shakes that taste like chalk powder — here is my 3-second kitchen test.",
    pitchSummary: "I will shoot a fast-paced workplace vs. gym sketch comparing terrible clumpy protein vs. BeastLife instant dissolution in cold water. I will include on-screen macro breakdowns and my verified coupon link.",
    submittedAt: "2 hours ago",
    status: "pending"
  },
  {
    id: "pitch-2",
    briefId: "brief-1",
    briefTitle: "Summer 100% Whey Isolate Launch",
    brandName: "BeastLife Nutrition",
    creatorUsername: "karthik_fitness",
    creatorName: "Karthik R.",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    creatorTier: "Beta",
    creatorScore: 82,
    creatorCategory: "Fitness & Nutrition",
    creatorAvgViews: 38500,
    creatorEngagement: 6.9,
    creatorReach: 140000,
    proposedRate: 14000,
    deliveryDays: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-walking-in-a-gym-42861-large.mp4",
    videoDurationSec: 38,
    hookText: "Why 80% of gym beginners in India quit their protein routine within 2 weeks...",
    pitchSummary: "Pitching a bilingual Tamil/English reel showing post-workout absorption and my exact morning smoothie recipe with BeastLife isolate.",
    submittedAt: "5 hours ago",
    status: "pending"
  },
  {
    id: "pitch-3",
    briefId: "brief-1",
    briefTitle: "Summer 100% Whey Isolate Launch",
    brandName: "BeastLife Nutrition",
    creatorUsername: "rohan_ugc",
    creatorName: "Rohan V.",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    creatorTier: "Gamma",
    creatorScore: 58,
    creatorCategory: "UGC Ad Specialist",
    creatorAvgViews: 12400,
    creatorEngagement: 8.2,
    creatorReach: 18000,
    proposedRate: 6000,
    deliveryDays: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-43015-large.mp4",
    videoDurationSec: 29,
    hookText: "I did a blind spoon test on 3 popular whey brands — look at this residue.",
    pitchSummary: "High conversion direct-response UGC ad formatted for Meta Ads & Reels. Raw macro camera angles showing zero foam and clean mixing.",
    submittedAt: "Yesterday",
    status: "pending"
  }
];

export const MOCK_OFFERS: StructuredOffer[] = [
  {
    id: "off-101",
    campaignTitle: "Prime India Student Blitz Launch",
    brandName: "Prime Beverages India Pvt Ltd",
    brandLogo: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&auto=format&fit=crop&q=80",
    creatorUsername: "alex_kumar",
    creatorName: "Alex Kumar",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    deliverables: "1x Dedicated Instagram Reel (30-45s) + 2x Stories with Swipe-up",
    baseAmount: 35000,
    gstAmount: 6300,
    totalAmount: 41300,
    deadline: "Oct 25, 2026",
    revisionsIncluded: 1,
    status: "pending",
    sentAt: "Today at 10:30 AM",
    contractTerms: [
      "Full milestone agreement confirmed by CreatorZ prior to script commencement.",
      "Creator delivers raw video draft within 5 calendar days of concept sign-off.",
      "1 minor revision round included (color/audio/cut adjustments).",
      "Instant payout released to creator within 2 hours of brand final approval."
    ]
  }
];

export const MOCK_ORDER_ROOM: OrderRoomData = {
  id: "ord-8492",
  campaignTitle: "Summer 100% Whey Isolate Launch",
  brandName: "BeastLife Nutrition",
  brandLogo: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&auto=format&fit=crop&q=80",
  creatorUsername: "alex_kumar",
  creatorName: "Alex Kumar",
  creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  contractTotal: 25000,
  currentMilestoneStage: 3, // Video Draft in Review
  milestones: [
    {
      stage: 1,
      name: "Milestone Agreement Locked",
      status: "completed",
      description: "Brand confirmed ₹25,000 milestone agreement. Contract terms are 100% locked.",
      date: "Oct 10, 2026",
      payoutPercent: 0,
      refundPercent: 100
    },
    {
      stage: 2,
      name: "Script & Concept Approved",
      status: "completed",
      description: "Concept 'Workplace Energy Crash' signed off by brand marketing team.",
      date: "Oct 12, 2026",
      payoutPercent: 25,
      refundPercent: 75
    },
    {
      stage: 3,
      name: "Video Draft in Review",
      status: "active",
      description: "Creator uploaded Draft v1. Brand is reviewing with timestamped timeline pins.",
      date: "Oct 15, 2026",
      payoutPercent: 50,
      refundPercent: 50
    },
    {
      stage: 4,
      name: "Revisions Resolution",
      status: "pending",
      description: "Creator applies minor audio & brightening fixes requested by brand.",
      payoutPercent: 50,
      refundPercent: 50
    },
    {
      stage: 5,
      name: "Final Delivery Approved",
      status: "pending",
      description: "Brand confirms video meets all compliance guidelines and gives final green light.",
      payoutPercent: 100,
      refundPercent: 0
    },
    {
      stage: 6,
      name: "Milestone Approved & Auto-Portfolio",
      status: "pending",
      description: "Funds transfer directly to creator's bank, GST invoice is generated, and deliverable auto-publishes to creator's verified portfolio.",
      payoutPercent: 100,
      refundPercent: 0
    }
  ],
  drafts: [
    {
      id: "dr-1",
      version: "v1",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41541-large.mp4",
      uploadedAt: "Oct 15, 2026 at 2:15 PM",
      fileSizeMb: 38.4,
      pins: [
        {
          id: "pin-1",
          timestampSec: 8,
          authorName: "BeastLife Marketing",
          authorRole: "Brand",
          comment: "Please brighten the product label shot at 0:08 so the '100% Isolate' text is unmistakable.",
          resolved: false,
          createdAt: "Oct 15 at 3:30 PM"
        },
        {
          id: "pin-2",
          timestampSec: 22,
          authorName: "BeastLife Marketing",
          authorRole: "Brand",
          comment: "Great dissolve transition here! Please ensure the discount code 'BEASTALEX' stays on-screen for 3 full seconds.",
          resolved: false,
          createdAt: "Oct 15 at 3:32 PM"
        }
      ]
    }
  ]
};
