
# Getting Started

First, install:

```
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Product data

Assumption: all attributes - except reduced price - for ear product are provided. In case original and reduced priced exists the statistics uses reduced prices.

# Unit Tests

```
npm run test
```

# Open Issues

## Warning: Prop `className` did not match. Server: "MuiBox-root MuiBox-root-1" Client: "MuiBox-root MuiBox-root-2"

Problems occurs in layout.tsx
Needs to be fixed. One possibility is disabling SSR for certain components:
See also: https://stackoverflow.com/q/60060544/3437868