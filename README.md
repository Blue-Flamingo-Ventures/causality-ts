# **Causality Client**

A simple TypeScript/JavaScript client library for interacting with the [Causality API](https://causality.xyz/).

---

## Installation

Install the library via npm:

```bash
npm install causality-ts
```

## **Usage**

Once imported into your project, you can use the client like so in a regular JS project

```js
import CausalityClient from "causality-ts";


function main() {
  const key = "YOUR_EXPERIENCE_KEY";
  const token = "YOUR_EXPERIENCE_TOKEN";

  const client = new CausalityClient(key, token);

  try {
    const response = await client.RequestQrCode();
    console.log("QR Code: ", response.qrcode);
    console.log("Deeplink: ", response.deeplink);
  } catch (error) {
    console.error("Oops: ", error);
  }
}
```

or in a TS project

```ts
import CausalityClient, { RequestQrCodeResponse } from "causality-ts";

async function main(): Promise<void> {
  const key: string = "YOUR_EXPERIENCE_KEY";
  const token: string = "YOUR_EXPERIENCE_TOKEN";

  const client = new CausalityClient(key, token);

  try {
    const response: RequestQrCodeResponse = await client.RequestQrCode();
    console.log("QR Code: ", response?.qrcode);
    console.log("Deeplink: ", response?.deeplink);
  } catch (error) {
    console.error("Oops: ", error);
  }
}
```
