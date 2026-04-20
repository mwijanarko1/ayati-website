export const AYATI_OAUTH_CALLBACK_URL = "ayati://oauth/callback";

export function buildAyatiOAuthCallbackUrl(search: string | URLSearchParams): string {
  const query = typeof search === "string"
    ? search.trim().replace(/^\?/, "")
    : search.toString();

  return query ? `${AYATI_OAUTH_CALLBACK_URL}?${query}` : AYATI_OAUTH_CALLBACK_URL;
}
