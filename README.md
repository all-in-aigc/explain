## What's this

Explain is a Chrome extension used to explain anything you selected in a web page.

## How to use

- install from source code

```shell
cd path-to-source

pnpm install

pnpm dev
```

- import local extension

open `chrome://extensions/`

import unzip dir `path-to-source/build/chrome-mv3-dev`

- custom env variables

open or new a file named `path-to-source/.env`

change to your custom variables

```
PLASMO_PUBLIC_OPENAI_API_KEY=YOUR-OPENAI-API-KEY
```

- use Explain in web page

refresh a web page

select something, right click your mouse

you will see a menu named 'Explain it', click it to Explain what you selected.

## Reference

[plasmo](https://docs.plasmo.com/framework)
