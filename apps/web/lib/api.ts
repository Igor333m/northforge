// TODO: Phase 2 — this module is unused during the static-only phase (Phase 1).
// When the NestJS backend (apps/api) is live, import `api` from here in Server Components
// and Client Components instead of calling fetch() directly. Set NEXT_PUBLIC_API_URL in
// .env to point at the backend base URL (e.g. http://localhost:3001 locally).
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type RequestOptions = Omit<RequestInit, "method" | "body">;

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestOptions,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(
      (error as { message?: string }).message ?? response.statusText,
    );
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, init?: RequestOptions) =>
    request<T>("GET", path, undefined, init),

  post: <T>(path: string, body: unknown, init?: RequestOptions) =>
    request<T>("POST", path, body, init),

  patch: <T>(path: string, body: unknown, init?: RequestOptions) =>
    request<T>("PATCH", path, body, init),

  delete: <T>(path: string, init?: RequestOptions) =>
    request<T>("DELETE", path, undefined, init),
};
