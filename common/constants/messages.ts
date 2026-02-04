export const AUTH_MESSAGES = {
  ERRORS: {
    LOADING_AUTH: "Error loading auth:",
    SAVING_AUTH: "Error saving auth:",
    LOGGING_OUT: "Error logging out:",
    LOGIN_FAILED: "Login Failed",
    INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    SIGNUP_FAILED: "Signup Failed",
    FAILED_CREATE_ACCOUNT: "Failed to create account. Please try again.",
    AUTH_CONTEXT_ERROR: "useAuth must be used within an AuthProvider",
    TOKEN_REQUIRED: "Token is required",
    BACKEND_URL_NOT_CONFIGURED:
      "Backend API URL not configured. Set EXPO_PUBLIC_BACKEND_URL environment variable.",
    ERROR_RETRIEVING_TOKEN: "Error retrieving token from storage:",
    ERROR_SETTING_TOKEN: "Error setting token in storage:",
    ERROR_CLEARING_TOKEN: "Error clearing token from storage:",
  },
  SUCCESS: {
    ACCOUNT_CREATED: "Account created successfully!",
    ADMIN_ACCOUNT: "You are now an admin.",
    WELCOME: "Welcome aboard!",
    PLEASE_LOGIN: "Please login with your credentials.",
  },
  PROMPT: {
    OK: "OK",
  },
};

// Theme Messages
export const THEME_MESSAGES = {
  LOADING_THEME: "Error loading theme:",
  SAVING_THEME: "Error saving theme:",
  THEME_CONTEXT_ERROR: "useTheme must be used within a ThemeProvider",
};

// Home Screen Messages
export const HOME_MESSAGES = {
  LOGOUT: {
    TITLE: "Logout",
    MESSAGE: "Are you sure you want to logout?",
    CANCEL: "Cancel",
    CONFIRM: "Logout",
  },
};

// Alert Button Styles
export const ALERT_STYLES = {
  CANCEL: "cancel" as const,
  DESTRUCTIVE: "destructive" as const,
};
