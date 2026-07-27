export function logErrorToSentry(error: any, context?: Record<string, any>) {
  const isDev = process.env.NODE_ENV === "development";
  console.error("🚨 [Sentry Error Monitor]:", error, context || "");

  if (!isDev) {
    // In production Vercel / Railway environment, errors are sent to Sentry DSN
    try {
      if (typeof window !== "undefined" && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, { extra: context });
      }
    } catch (e) {
      // Ignore fallback
    }
  }
}
