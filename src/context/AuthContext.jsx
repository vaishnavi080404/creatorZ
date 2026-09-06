"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const AuthContext = createContext(null);

export const SEED_ADMIN = {
  id: "admin-1",
  name: "Ops Director",
  email: "admin@creatorz.internal",
  password: "admin_password_123",
  role: "admin",
  initials: "OD",
  title: "Director of Internal Operations & Trust",
  department: "Security & Operations Command",
  badge: "SUPER ADMIN",
};

export const SEED_USERS = [
  SEED_ADMIN,
  {
    id: "cr-1",
    name: "Alex Kumar",
    email: "alex@creatorz.io",
    handle: "@alex_kumar",
    role: "creator",
    initials: "AK",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    category: "Tech & Consumer Goods",
    tier: "Alpha",
    onTimeDeliveryRate: 98,
  },
  {
    id: "cr-2",
    name: "Maya Roy",
    email: "maya@creatorz.io",
    handle: "@maya_creates",
    role: "creator",
    initials: "MR",
    category: "Fashion & Lifestyle",
    tier: "Rising",
  },
  {
    id: "cr-3",
    name: "Maya Roy (Google)",
    email: "maya.roy.creates@gmail.com",
    handle: "@maya_roy",
    role: "creator",
    initials: "MR",
    category: "Fashion & Lifestyle",
    tier: "Rising",
  },
  {
    id: "br-1",
    name: "Priya Sharma",
    email: "priya@beastlife.com",
    company: "BeastLife Nutrition",
    role: "brand",
    initials: "PS",
    avatar: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&auto=format&fit=crop&q=80",
    title: "Head of Influencer & Growth",
    category: "FMCG & Beverages",
  },
  {
    id: "br-2",
    name: "Karan Mehra",
    email: "karan@kalyanorganics.com",
    company: "Kalyan Organics",
    role: "brand",
    initials: "KM",
    title: "Brand Commissioner",
    category: "FMCG & Beverages",
  },
  {
    id: "br-3",
    name: "Karan Mehra (Google)",
    email: "karan.mehra@kalyanorganics.com",
    company: "Kalyan Organics",
    role: "brand",
    initials: "KM",
    title: "Brand Commissioner",
    category: "FMCG & Beverages",
  },
  {
    id: "br-4",
    name: "Priya Sharma (Growth)",
    email: "priya.sharma.growth@beastlife.com",
    company: "BeastLife Nutrition",
    role: "brand",
    initials: "PS",
    title: "Head of Growth",
    category: "FMCG & Beverages",
  },
];

const DEFAULT_CREATOR = SEED_USERS.find((u) => u.role === "creator") || SEED_USERS[1];
const DEFAULT_BRAND = SEED_USERS.find((u) => u.role === "brand") || SEED_USERS[4];
const DEFAULT_ADMIN = SEED_ADMIN;

export function syncAuthCookies(sessionUser) {
  if (typeof document === "undefined") return;
  if (sessionUser && sessionUser.role) {
    document.cookie = `creatorz_auth_role=${sessionUser.role}; path=/; SameSite=Lax; max-age=86400`;
    document.cookie = `creatorz_auth_session=${encodeURIComponent(JSON.stringify(sessionUser))}; path=/; SameSite=Lax; max-age=86400`;
  } else {
    document.cookie = "creatorz_auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "creatorz_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  }
}

export function detectRoleFromEmail(email, registry = []) {
  if (!email) return "creator";
  const normalized = email.trim().toLowerCase();

  // 1. Check registry first
  const match = registry.find(
    (u) => (u.email || "").trim().toLowerCase() === normalized
  );
  if (match) return match.role;

  // 2. Admin recognition
  if (
    normalized === "admin@creatorz.internal" ||
    normalized.endsWith("@creatorz.internal") ||
    normalized.startsWith("admin@")
  ) {
    return "admin";
  }

  // 3. Keyword heuristics
  if (
    normalized.includes("brand") ||
    normalized.includes("beastlife") ||
    normalized.includes("kalyan") ||
    normalized.includes("organics") ||
    normalized.includes("corp") ||
    normalized.includes("agency")
  ) {
    return "brand";
  }
  if (
    normalized.includes("creator") ||
    normalized.includes("creates") ||
    normalized.includes("talent")
  ) {
    return "creator";
  }

  // 3. Domain heuristics: non-free domains are typically brand/enterprise
  const domain = normalized.split("@")[1] || "";
  const freeMail = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "mail.com",
    "proton.me",
    "protonmail.com",
  ];
  if (domain && !freeMail.includes(domain)) {
    return "brand";
  }

  return "creator";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(SEED_USERS);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users registry and auth session from localStorage
  useEffect(() => {
    try {
      // 1. Load users registry safely without wiping user customized profiles
      const storedRegistry = localStorage.getItem("creatorz_users_registry");
      let activeUsers = SEED_USERS;
      if (storedRegistry) {
        try {
          const parsed = JSON.parse(storedRegistry);
          const parsedArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
          
          // Map of stored users by normalized email
          const storedEmailMap = new Map();
          parsedArray.forEach((u) => {
            if (u && u.email) {
              storedEmailMap.set(u.email.toLowerCase().trim(), u);
            }
          });

          // Keep all stored users, including customized seed accounts (e.g. customized company names)
          const merged = [...parsedArray];

          // Ensure any missing seed users are available as fallback
          SEED_USERS.forEach((su) => {
            if (su && su.email && !storedEmailMap.has(su.email.toLowerCase().trim())) {
              merged.push(su);
            }
          });
          activeUsers = merged;
        } catch (err) {
          console.error("Failed to parse stored registry", err);
          activeUsers = SEED_USERS;
        }
      }
      setUsers(activeUsers);
      localStorage.setItem(
        "creatorz_users_registry",
        JSON.stringify(activeUsers)
      );

      // 2. Load current session
      const storedSession = localStorage.getItem("creatorz_auth_session");
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        setUser(parsed);
        syncAuthCookies(parsed);
      }

      // 3. Supabase Session Sync (if live Supabase is active)
      if (isSupabaseConfigured() && supabase) {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
          if (session?.user) {
            const email = session.user.email?.toLowerCase().trim();
            try {
              const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("email", email)
                .maybeSingle();

              let brandProfile = null;
              if (profile?.role === "brand") {
                const { data: bp } = await supabase
                  .from("brand_profiles")
                  .select("*")
                  .eq("user_id", profile.id)
                  .maybeSingle();
                brandProfile = bp;
              }

              const resolvedRole = profile?.role || session.user.user_metadata?.role || detectRoleFromEmail(email, activeUsers);
              const isBrand = resolvedRole === "brand";
              const name =
                profile?.name ||
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                (isBrand ? "Brand Partner" : "Creative Partner");

              const company = brandProfile?.company_name || "";
              const verified = Boolean(brandProfile?.verified);
              const initials = (company || name)
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const fullUser = {
                id: profile?.id || session.user.id,
                email: email,
                name: name,
                role: resolvedRole,
                initials: initials || (isBrand ? "BR" : "CR"),
                avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                company: company,
                companyName: company,
                category: brandProfile?.category || "D2C Brand",
                website: brandProfile?.website || "",
                gstin: brandProfile?.gstin || "",
                onboarding_completed: isBrand ? Boolean(company) : true,
                is_verified: verified,
                verified: verified,
              };

              setUser(fullUser);
              localStorage.setItem("creatorz_auth_session", JSON.stringify(fullUser));
              syncAuthCookies(fullUser);
            } catch (err) {
              console.warn("[AuthContext] session profile sync error", err);
            }
          }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
              const email = session.user.email?.toLowerCase().trim();
              try {
                const { data: profile } = await supabase
                  .from("profiles")
                  .select("*")
                  .eq("email", email)
                  .maybeSingle();

                let brandProfile = null;
                if (profile?.role === "brand") {
                  const { data: bp } = await supabase
                    .from("brand_profiles")
                    .select("*")
                    .eq("user_id", profile.id)
                    .maybeSingle();
                  brandProfile = bp;
                }

                const resolvedRole = profile?.role || session.user.user_metadata?.role || "brand";
                const isBrand = resolvedRole === "brand";
                const name =
                  profile?.name ||
                  session.user.user_metadata?.full_name ||
                  session.user.user_metadata?.name ||
                  (isBrand ? "Brand Partner" : "Creative Partner");

                const company = brandProfile?.company_name || "";
                const verified = Boolean(brandProfile?.verified);
                const initials = (company || name)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const fullUser = {
                  id: profile?.id || session.user.id,
                  email: email,
                  name: name,
                  role: resolvedRole,
                  initials: initials || (isBrand ? "BR" : "CR"),
                  avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                  avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url || null,
                  company: company,
                  companyName: company,
                  category: brandProfile?.category || "D2C Brand",
                  website: brandProfile?.website || "",
                  gstin: brandProfile?.gstin || "",
                  onboarding_completed: isBrand ? Boolean(company) : true,
                  is_verified: verified,
                  verified: verified,
                };

                setUser(fullUser);
                localStorage.setItem("creatorz_auth_session", JSON.stringify(fullUser));
                syncAuthCookies(fullUser);
              } catch (err) {
                console.warn("[AuthContext onAuthStateChange] error:", err);
              }
            } else if (event === "SIGNED_OUT") {
              setUser(null);
              localStorage.removeItem("creatorz_auth_session");
              syncAuthCookies(null);
            }
          }
        );

        return () => {
          authListener?.subscription?.unsubscribe();
        };
      }
    } catch (e) {
      console.error("Failed to load auth session or registry from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Strict email availability check across ALL roles (admin cannot be registered publicly)
  const checkEmailAvailability = useCallback(
    (email, targetRole) => {
      if (!email) return { available: true };
      const normalized = email.trim().toLowerCase();

      // Guard internal admin domain and emails
      if (
        normalized === "admin@creatorz.internal" ||
        normalized.endsWith("@creatorz.internal") ||
        targetRole === "admin"
      ) {
        return {
          available: false,
          error: "Admin accounts cannot be registered via public registration.",
        };
      }

      const existing = users.find(
        (u) => (u.email || "").trim().toLowerCase() === normalized
      );

      if (existing) {
        if (existing.role === "admin") {
          return {
            available: false,
            error: "This email belongs to an internal reserved system account.",
            existingUser: existing,
          };
        }
        if (existing.role !== targetRole) {
          const oppositeRoleName =
            existing.role === "brand" ? "Brand" : "Creator";
          return {
            available: false,
            error: `This email is already registered as a ${oppositeRoleName} account. Please use a separate email address.`,
            existingUser: existing,
          };
        }
        return {
          available: false,
          error: "An account with this email already exists. Please sign in.",
          existingUser: existing,
        };
      }

      return { available: true };
    },
    [users]
  );

  // Find user by email in registry
  const findUserByEmail = useCallback(
    (email) => {
      if (!email) return null;
      const normalized = email.trim().toLowerCase();
      return (
        users.find(
          (u) => (u.email || "").trim().toLowerCase() === normalized
        ) || null
      );
    },
    [users]
  );

  // Detect role for an email
  const detectRole = useCallback(
    (email) => {
      return detectRoleFromEmail(email, users);
    },
    [users]
  );

  // Sign up a new user with strict cross-role uniqueness (No admin sign-up)
  const signup = useCallback(
    (role = "creator", formData = {}) => {
      if (role === "admin") {
        throw new Error("Admin registration is not permitted. Admin access is strictly pre-seeded.");
      }

      const email = (formData.email || "").trim();

      // Enforce strict uniqueness check
      if (email) {
        const check = checkEmailAvailability(email, role);
        if (!check.available) {
          throw new Error(check.error);
        }
      }

      const initials = formData.name
        ? formData.name
            .trim()
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : role === "brand"
        ? "BR"
        : "CR";

      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name || (role === "brand" ? "Brand Partner" : "New Creator"),
        email: email || `user@creatorz.io`,
        role: role,
        initials: initials,
        avatar: formData.avatar || null,
        handle:
          formData.handle ||
          (role === "creator"
            ? `@${formData.name?.toLowerCase().replace(/\s+/g, "_") || "creator"}`
            : undefined),
        company:
          formData.company ||
          (role === "brand" ? "Enterprise Partner" : undefined),
        category:
          formData.category ||
          (role === "creator" ? "General Creator" : "D2C Brand"),
        tier: "Rising",
        onboarding_completed:
          formData.onboarding_completed !== undefined
            ? formData.onboarding_completed
            : role === "brand"
            ? false
            : true,
        is_verified: formData.is_verified || false,
        ...formData,
      };

      // Add to users registry
      const updatedUsers = [...users.filter((u) => u.email.toLowerCase() !== email.toLowerCase()), newUser];
      setUsers(updatedUsers);
      try {
        localStorage.setItem(
          "creatorz_users_registry",
          JSON.stringify(updatedUsers)
        );
      } catch (e) {
        console.error("Failed to persist updated users registry", e);
      }

      // Set user session and cookie
      setUser(newUser);
      try {
        localStorage.setItem("creatorz_auth_session", JSON.stringify(newUser));
        syncAuthCookies(newUser);
      } catch (e) {
        console.error("Failed to save auth session", e);
      }

      // If brand user, proactively sync row to Supabase via server API
      if (role === "brand" && email) {
        try {
          fetch("/api/user/sync-brand-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              name: newUser.name,
              companyName: newUser.company || "",
              category: newUser.category || "D2C Brand",
              userId: newUser.id,
              verified: false,
            }),
          }).catch((err) => console.warn("[AuthContext signup sync error]", err));
        } catch (e) {
          // ignore
        }
      }

      return newUser;
    },
    [users, checkEmailAvailability]
  );

  // Update authenticated user profile and sync to storage/database
  const updateUserProfile = useCallback(
    async (updates = {}) => {
      if (!user) return null;

      const updatedUser = {
        ...user,
        ...updates,
        company: updates.company || updates.companyName || user.company,
        companyName: updates.companyName || updates.company || user.companyName,
        name: updates.representativeName || updates.name || user.name,
        avatar: updates.avatar || updates.logo || user.avatar,
        avatar_url: updates.avatar || updates.logo || user.avatar_url,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      };

      const titleForInitials = updatedUser.company || updatedUser.name || "US";
      updatedUser.initials = titleForInitials
        .trim()
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      setUser(updatedUser);

      try {
        localStorage.setItem("creatorz_auth_session", JSON.stringify(updatedUser));
        syncAuthCookies(updatedUser);
      } catch (e) {
        console.error("Failed to save updated session to localStorage", e);
      }

      try {
        const storedRegistry = localStorage.getItem("creatorz_users_registry");
        let reg = storedRegistry ? JSON.parse(storedRegistry) : users;
        const regArray = Array.isArray(reg) ? [...reg] : Object.values(reg);
        const userEmail = (updatedUser.email || "").toLowerCase().trim();
        
        const existingIdx = regArray.findIndex(
          (u) => (u.email || "").toLowerCase().trim() === userEmail
        );
        if (existingIdx >= 0) {
          regArray[existingIdx] = updatedUser;
        } else {
          regArray.push(updatedUser);
        }
        setUsers(regArray);
        localStorage.setItem("creatorz_users_registry", JSON.stringify(regArray));

        // If brand user, sync directly to creatorz_brand_verifications queue
        if (updatedUser.role === "brand") {
          const storedQueue = localStorage.getItem("creatorz_brand_verifications");
          let brandQueue = storedQueue ? JSON.parse(storedQueue) : [];
          if (!Array.isArray(brandQueue)) brandQueue = Object.values(brandQueue);
          
          const qIdx = brandQueue.findIndex(
            (b) => (b.email || "").toLowerCase().trim() === userEmail ||
                   (b.company && b.company.toLowerCase().trim() === (updatedUser.company || "").toLowerCase().trim())
          );
          if (qIdx >= 0) {
            brandQueue[qIdx] = { ...brandQueue[qIdx], ...updatedUser };
          } else {
            brandQueue.unshift(updatedUser);
          }
          localStorage.setItem("creatorz_brand_verifications", JSON.stringify(brandQueue));
        }
      } catch (e) {
        console.error("Failed to update registry in localStorage", e);
      }

      if (updatedUser.role === "brand") {
        try {
          await fetch("/api/user/sync-brand-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: updatedUser.email,
              name: updatedUser.name,
              representativeName: updatedUser.representativeName || updatedUser.name,
              companyName: updatedUser.company || updatedUser.companyName,
              companyType:
                updatedUser.specs?.businessType ||
                updatedUser.company_type ||
                "D2C Brand",
              category: updatedUser.category || "D2C Brand",
              website: updatedUser.website,
              gstin: updatedUser.gstin,
              avatarUrl: updatedUser.avatar || updatedUser.avatar_url,
              userId: updatedUser.id,
              verified: Boolean(updatedUser.is_verified || updatedUser.verified),
            }),
          });
        } catch (apiErr) {
          console.warn("[AuthContext sync-brand-profile error]", apiErr);
        }
      }

      return updatedUser;
    },
    [user, users]
  );

  // Auto-detect login by inspecting email record
  const autoLogin = useCallback(
    (email, password = "", customData = {}) => {
      if (!email) {
        throw new Error("Please enter your email address.");
      }

      const normalizedEmail = email.trim().toLowerCase();

      // If logging in as internal admin via credentials
      if (
        normalizedEmail === "admin@creatorz.internal" &&
        password === "admin_password_123"
      ) {
        setUser(SEED_ADMIN);
        try {
          localStorage.setItem("creatorz_auth_session", JSON.stringify(SEED_ADMIN));
          syncAuthCookies(SEED_ADMIN);
        } catch (e) {
          console.error("Failed to save admin session", e);
        }
        return {
          success: true,
          user: SEED_ADMIN,
          role: "admin",
        };
      }

      let matchedUser = users.find(
        (u) => (u.email || "").trim().toLowerCase() === normalizedEmail
      );

      let detectedRole;
      let sessionUser;

      if (matchedUser) {
        detectedRole = matchedUser.role;
        sessionUser = {
          ...matchedUser,
          ...customData,
          role: detectedRole,
        };
      } else {
        // Auto-detect role if not yet registered in registry
        detectedRole = detectRoleFromEmail(normalizedEmail, users);
        const base =
          detectedRole === "brand"
            ? DEFAULT_BRAND
            : detectedRole === "admin"
            ? DEFAULT_ADMIN
            : DEFAULT_CREATOR;
        const namePart = normalizedEmail.split("@")[0].replace(/[._]/g, " ");
        const formattedName =
          namePart.charAt(0).toUpperCase() + namePart.slice(1);

        sessionUser = {
          ...base,
          id: `user-${Date.now()}`,
          name: formattedName || (detectedRole === "brand" ? "Brand Lead" : "New Creator"),
          email: normalizedEmail,
          role: detectedRole,
          company:
            detectedRole === "brand"
              ? normalizedEmail.split("@")[1]?.split(".")[0]?.toUpperCase() || "Enterprise Brand"
              : undefined,
          initials: formattedName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || (detectedRole === "brand" ? "BR" : "CR"),
          ...customData,
        };

        // Persist to registry
        const updatedUsers = [...users, sessionUser];
        setUsers(updatedUsers);
        try {
          localStorage.setItem(
            "creatorz_users_registry",
            JSON.stringify(updatedUsers)
          );
        } catch (e) {
          console.error("Failed to save auto-registered user to registry", e);
        }
      }

      setUser(sessionUser);
      try {
        localStorage.setItem(
          "creatorz_auth_session",
          JSON.stringify(sessionUser)
        );
        syncAuthCookies(sessionUser);
      } catch (e) {
        console.error("Failed to save auth session", e);
      }

      return {
        success: true,
        user: sessionUser,
        role: detectedRole,
      };
    },
    [users]
  );

  // Dedicated Admin Login for internal ops console
  const adminLogin = useCallback(
    (email, password) => {
      const normalizedEmail = (email || "").trim().toLowerCase();
      const cleanPassword = (password || "").trim();

      if (
        normalizedEmail === "admin@creatorz.internal" &&
        cleanPassword === "admin_password_123"
      ) {
        setUser(SEED_ADMIN);
        try {
          localStorage.setItem("creatorz_auth_session", JSON.stringify(SEED_ADMIN));
          syncAuthCookies(SEED_ADMIN);
        } catch (e) {
          console.error("Failed to save admin session", e);
        }
        return { success: true, user: SEED_ADMIN };
      }

      throw new Error("Invalid admin credentials. Access restricted to authorized ops staff.");
    },
    []
  );

  // Standard login method (supports explicit role or role toggle)
  const login = useCallback(
    (role = "creator", customData = {}) => {
      const base =
        role === "brand"
          ? DEFAULT_BRAND
          : role === "admin"
          ? DEFAULT_ADMIN
          : DEFAULT_CREATOR;
      const sessionUser = {
        ...base,
        ...customData,
        role: role,
        initials: customData.name
          ? customData.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : base.initials,
      };
      setUser(sessionUser);
      try {
        localStorage.setItem("creatorz_auth_session", JSON.stringify(sessionUser));
        syncAuthCookies(sessionUser);
      } catch (e) {
        console.error("Failed to save auth session", e);
      }
      return sessionUser;
    },
    []
  );

  // Google Sign-In: Tries live Supabase Google OAuth, with informative fallback/guide
  const signInWithGoogle = useCallback(
    async (role = "auto", customData = {}) => {
      // 1. If Supabase is configured, trigger genuine Supabase OAuth
      if (isSupabaseConfigured() && supabase) {
        try {
          const redirectUrl =
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback?role=${role}`
              : undefined;

          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: redirectUrl,
              queryParams: {
                access_type: "offline",
                prompt: "consent",
              },
            },
          });

          if (error) {
            throw error;
          }

          if (data?.url) {
            window.location.href = data.url;
            return { success: true, redirecting: true };
          }
        } catch (supabaseError) {
          console.warn("[CreatorZ Google Auth]", supabaseError.message);
          if (
            supabaseError.message?.toLowerCase().includes("provider is not enabled") ||
            supabaseError.message?.toLowerCase().includes("unsupported provider")
          ) {
            throw new Error(
              "Google Sign-In is not enabled in your Supabase project yet. Please enable Google under Supabase Dashboard -> Authentication -> Providers -> Google."
            );
          }
          throw supabaseError;
        }
      }

      // 2. Demo fallback: check if email provided has opposite role!
      if (customData.email) {
        const check = checkEmailAvailability(customData.email, role);
        if (!check.available) {
          throw new Error(check.error);
        }
      }

      const freshEmail = customData.email || `google.user.${Date.now()}@gmail.com`;
      const name = customData.name || (role === "brand" ? "Google Brand Partner" : "Google Creator");

      const created = signup(role, {
        name,
        email: freshEmail,
        company: role === "brand" ? "" : undefined,
        category: role === "brand" ? "" : "Fashion & Lifestyle",
        onboarding_completed: role === "brand" ? false : true,
        is_verified: false,
        ...customData,
      });

      return { success: true, user: created, role };
    },
    [signup, checkEmailAvailability]
  );

  const logout = useCallback(async () => {
    setUser(null);
    try {
      localStorage.removeItem("creatorz_auth_session");
      syncAuthCookies(null);
    } catch (e) {
      console.error("Failed to remove auth session", e);
    }
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        adminLogin,
        autoLogin,
        signup,
        updateUserProfile,
        signInWithGoogle,
        logout,
        checkEmailAvailability,
        findUserByEmail,
        detectRole,
        SEED_ADMIN,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
