import { Observable, from, of, timer } from "rxjs";
import { map, distinctUntilChanged, switchMap, startWith, catchError } from "rxjs/operators";
import { fetchUrlInfo } from "./mock-server";
import { isValidUrlFormat } from "./url-validation";

export interface UrlStatus {
    text: string;
    className: string;
}

const EMPTY_INPUT: UrlStatus = { text: "", className: "" };
const INVALID_FORMAT: UrlStatus = { text: "Invalid URL format", className: "error" };
const CHECKING_URL: UrlStatus = { text: "Checking if entered URL exists", className: "" };
const SERVER_ERROR: UrlStatus = { text: "Could not reach the server, please try again", className: "error" };

const TYPING_PAUSE_MS = 300;

export function createUrlStatus$(typedText$: Observable<string>): Observable<UrlStatus> {
    return typedText$.pipe(
        map((text) => text.trim()),
        distinctUntilChanged(), // skip if the value is identical as the last value
        switchMap((url) => { // cancel the old request and keeps only the latest one
            if (url === "") return of(EMPTY_INPUT);
            if (!isValidUrlFormat(url)) return of(INVALID_FORMAT);

            return timer(TYPING_PAUSE_MS).pipe(
                switchMap(() => from(fetchUrlInfo(url))),
                map((result): UrlStatus =>
                    result.exists
                        ? { text: `URL exists (${result.resourceType})`, className: "ok" }
                        : { text: "URL does not exist", className: "error" },
                ),
                catchError(() => of(SERVER_ERROR)),
                startWith(CHECKING_URL),
            );
        }),
    );
}
