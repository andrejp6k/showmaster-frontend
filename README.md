## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

You can specify PORT and DEVICE_ID process environment variables to override default ones while running the app while development like this:

Unix like shell:

```bash
PORT=1213 DEVICE_ID=your_desired_device_id npm start
```

Powershell:

```powershell
$env:PORT=1213 ; $env:DEVICE_ID="your_desired_device_id" ; npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
