export type UrlInfo =
  | { exists: true; resourceType: "file" | "folder" }
  | { exists: false };

const MOCK_DATA_URL = "/src/API/mock.json";
const SERVER_DELAY_MS = 500;

// Reads mock.json, checks if the URL exists and then return its type.
export async function fetchUrlInfo(url: string): Promise<UrlInfo> {
    const response = await fetch(MOCK_DATA_URL);
    if (!response.ok) throw new Error("Server Error");

    const knownUrls: Record<string, "file" | "folder"> = await response.json();
    await new Promise((resolve) => setTimeout(resolve, SERVER_DELAY_MS));

    const resourceType = knownUrls[url];
    return resourceType ? { exists: true, resourceType } : { exists: false };
}
