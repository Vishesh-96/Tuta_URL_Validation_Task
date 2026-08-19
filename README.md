# Tuta URL Validator

Browser app for Tuta using TypeScript + RxJS and bundled with Vite that tells us whether a typed URL is valid and exists on server.

Application Flow:

1. the input is checked for a valid absolute `http(s)://` URL,
2. valid URLs are sent to a mocked async server that replies whether the URL exists and whether it is a **file** or a **folder**,
3. the answer shows up under the input.

Currently we are not using a real backend, the "server" is `mockData/mock.json` plus a 500 ms delay.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173 and try a URL from `mockData/mock.json`, for example `https://tuta.com/pricing` (file) or `https://tuta.com/blog` (folder). Any other URL not present in mockData/mock.json comes back as "URL does not exist".

## Files

```
index.html              Contains code for input box + result line (UI)
src/main.ts             connects the view page to the logic
src/url-check.ts        the file check whether the given URL is valid and exists in mock.json
src/url-validation.ts   checks whether it follows proper http(s) URL format 
src/mock-server.ts      finds the type whether its a file or a folder
src/style.css           styling of elements
mockData/mock.json      mock URLs: file or folder
```

We wait 300 ms after the last keystroke (debounceTime), skip values identical to the previous one (distinctUntilChanged), and cancel any in-progress request when a newer URL arrives (switchMap).
