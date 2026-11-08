import type { HomeAssistant } from "./types";

const LOCALE = "en-US";

function localDayStart(ms: number): number {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function dayKey(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function use12Hours(hass: HomeAssistant | undefined): boolean {
  const pref = hass?.locale?.time_format;
  if (pref === "12") return true;
  if (pref === "24") return false;
  return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12 ?? false;
}

export function formatTime(ms: number, hass: HomeAssistant | undefined, seconds = false): string {
  const twelve = use12Hours(hass);
  return new Intl.DateTimeFormat(LOCALE, {
    hour: twelve ? "numeric" : "2-digit",
    minute: "2-digit",
    second: seconds ? "2-digit" : undefined,
    hourCycle: twelve ? "h12" : "h23",
  }).format(ms);
}

export function formatDateTime(ms: number, hass: HomeAssistant | undefined): string {
  const date = new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(ms);
  return `${date}, ${formatTime(ms, hass, true)}`;
}

export function formatRelative(ms: number, now: number): string {
  const seconds = Math.max(0, Math.round((now - ms) / 1000));
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return `${days} d ago`;
}

export function formatDayLabel(ms: number, now: number): string {
  const diffDays = Math.round((localDayStart(now) - localDayStart(ms)) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  const sameYear = new Date(ms).getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(ms);
}
