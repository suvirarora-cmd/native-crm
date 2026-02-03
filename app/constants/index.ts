export {
  ALERT_STYLES, AUTH_MESSAGES, HOME_MESSAGES, THEME_MESSAGES
} from './messages';

// Theme Mode Constants
export const THEME_MODES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
};

// Status Bar Styles
export const STATUS_BAR_STYLES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
};

// Platform Constants
export const PLATFORMS = {
  IOS: 'ios' as const,
  ANDROID: 'android' as const,
};

// Keyboard Behavior
export const KEYBOARD_BEHAVIOR = {
  PADDING: 'padding' as const,
  HEIGHT: 'height' as const,
};

// Icon Names
export const ICON_NAMES = {
  LOCK_CLOSED: 'lock-closed' as const,
  PERSON_ADD: 'person-add' as const,
  ARROW_BACK: 'arrow-back' as const,
  LOG_IN: 'log-in' as const,
  LOG_OUT: 'log-out' as const,
  CHECKMARK_CIRCLE: 'checkmark-circle' as const,
  SHIELD_CHECKMARK: 'shield-checkmark' as const,
  HOME: 'home' as const,
  STAR: 'star' as const,
  MAIL: 'mail' as const,
  PERSON: 'person' as const,
  SUNNY: 'sunny' as const,
  MOON: 'moon' as const,
  EYE_OUTLINE: 'eye-outline' as const,
  EYE_OFF_OUTLINE: 'eye-off-outline' as const,
};

// Common Sizes
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 24,
  XLARGE: 28,
  EXTRA_LARGE: 40,
  JUMBO: 50,
};

// Color Constants
export const COMMON_COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
  YELLOW: '#FCD34D',
  DARK_GRAY: '#1F2937',
  PURPLE: '#A78BFA',
};

export const READ_ORDER = [
  "1. QUICK_REFERENCE.ts - Get overview in 5 minutes",
  "2. AUTH_GUIDE.md - Understand complete flows",
  "3. API_FORMATS.md - See exact request/response formats",
  "4. FLOW_DIAGRAM.ts - Visualize the flows",
  "5. IMPLEMENTATION.md - See what was changed",
  "6. SUMMARY.ts - Get complete details"
];

export const KEY_CONCEPTS = {
  token: "JWT (JSON Web Token) stored in AsyncStorage + cookies",
  role: "'admin' or 'user' - determined by adminSecretKey",
  signup: "User creates account, redirected to login",
  login: "User enters credentials, token stored, redirected to /home",
  logout: "Token cleared, user redirected to login",
  protected: "Routes that require authentication",
  interceptor: "Automatically adds Bearer token to all requests",
  cookie: "Browser storage, 7-day expiration, web only",
  asyncStorage: "React Native storage, all platforms"
};

export const FILE_PURPOSES = {
  messages: "Centralized strings for auth, theme, home screens",
  routes: "Route definitions and API endpoint constants",
  authGuide: "Detailed explanation of authentication flows",
  apiFormats: "Exact format of API requests and responses",
  flowDiagram: "Visual ASCII diagrams of authentication flows",
  implementation: "Summary of all implementation changes",
  summary: "Complete information about implementation",
  quickReference: "Quick lookup for common tasks and info"
};

export const QUICK_ACCESS = {
  "How to signup?": "Read AUTH_GUIDE.md - Signup section",
  "How to login?": "Read AUTH_GUIDE.md - Login section",
  "Where is token stored?": "Read TOKEN_STORAGE in AUTH_GUIDE.md",
  "What API endpoints?": "See API_ENDPOINTS in routes.ts or API_FORMATS.md",
  "How to use useAuth?": "See QUICK_REFERENCE.ts - Common Tasks",
  "How to check if user is admin?": "const { user } = useAuth(); if (user.role === 'admin')",
  "How to logout?": "const { logout } = useAuth(); await logout();",
  "Backend requirements?": "See BACKEND_REQUIREMENTS in SUMMARY.ts",
  "Getting started?": "See QUICK_START in SUMMARY.ts",
  "Visual flows?": "See FLOW_DIAGRAM.ts"
};

export const TEST_CHECKLIST = {
  setup: [
    "Implement /auth/signup backend endpoint",
    "Implement /auth/login backend endpoint",
    "Set 7-day JWT expiration",
    "Add auth validation middleware"
  ],

  signup: [
    "Test: User creates account with role detection",
    "Test: Admin secret key validation",
    "Test: Redirect to login page",
    "Test: Token stored in storage"
  ],

  login: [
    "Test: User logs in successfully",
    "Test: Token stored in AsyncStorage",
    "Test: Token stored in cookies (web)",
    "Test: Redirect to /home",
    "Test: Wrong credentials show error"
  ],

  protected: [
    "Test: Protected routes require auth",
    "Test: Authorization header sent",
    "Test: 401 error returns to login",
    "Test: Token included in requests"
  ],

  logout: [
    "Test: Token cleared from storage",
    "Test: User redirected to login",
    "Test: Cannot access protected routes"
  ]
};

export const CONSTANTS_INDEX = {
  purpose: "This file serves as an index for all constants",
  location: "app/constants/index.ts",
  exports: [
    "AUTH_MESSAGES",
    "THEME_MESSAGES",
    "HOME_MESSAGES",
    "ALERT_STYLES",
    "ROUTES",
    "API_ENDPOINTS"
  ],
  documentation: [
    "AUTH_GUIDE.md",
    "API_FORMATS.md",
    "FLOW_DIAGRAM.ts",
    "IMPLEMENTATION.md",
    "SUMMARY.ts",
    "QUICK_REFERENCE.ts"
  ]
};
