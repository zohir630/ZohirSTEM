/** Remembers whether the person asked for the full (desktop) editor on a phone.
 *  `?view=desktop` in the address opens it and keeps it; `?view=mobile` goes back. */
const KEY = "m3e:view";

export type ViewPref = "desktop" | "auto";

export function readViewPref(): ViewPref {
  if (typeof window === "undefined") return "auto";
  try {
    const q = new URLSearchParams(window.location.search).get("view");
    if (q === "desktop") localStorage.setItem(KEY, "desktop");
    else if (q === "mobile") localStorage.setItem(KEY, "auto");
    return localStorage.getItem(KEY) === "desktop" ? "desktop" : "auto";
  } catch {
    return "auto";
  }
}

export function writeViewPref(v: ViewPref): void {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
}

/** a phone-sized screen, whatever width the page was told to lay out at */
export function isPhoneScreen(): boolean {
  if (typeof window === "undefined") return false;
  return Math.min(window.screen?.width ?? 9999, window.screen?.height ?? 9999) < 700;
}
