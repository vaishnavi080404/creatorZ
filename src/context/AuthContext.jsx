"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

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
      // 1. Load users registry
      const storedRegistry = localStorage.getItem("creatorz_users_registry");
      let activeUsers = SEED_USERS;
      if (storedRegistry) {
        const parsedRegistry = JSON.parse(storedRegistry);
        // Merge seed users so default accounts are never lost
        const seedEmails = new Set(
          SEED_USERS.map((u) => u.email.toLowerCase().trim())
        );
        const nonSeedStored = parsedRegistry.filter(
          (u) => !seedEmails.has((u.email || "").toLowerCase().trim())
        );
        activeUsers = [...SEED_USERS, ...nonSeedStored];
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
            error: `This email is already registered as a ${oppositeRoleName} account.`,
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

      return newUser;
    },
    [users, checkEmailAvailability]
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

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem("creatorz_auth_session");
      syncAuthCookies(null);
    } catch (e) {
      console.error("Failed to remove auth session", e);
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
