import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { createUrlStatus$, type UrlStatus } from "./url-check";
import './style.css';

const urlInputField = document.querySelector<HTMLInputElement>("#url-input")!;
const statusMessage = document.querySelector<HTMLElement>("#url-status-message")!;

function showStatus({ text, className }: UrlStatus) {
    statusMessage.textContent = text;
    statusMessage.className = className;
}

const typedUrl$ = fromEvent(urlInputField, "input").pipe(map(() => urlInputField.value));

createUrlStatus$(typedUrl$).subscribe(showStatus);
