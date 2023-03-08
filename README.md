# Vite + Tauri 🚀

Take your web app to the next level with the powerful combination of Tauri and Vite. By using the Tauri plugin for Vite, you can easily build fast and secure desktop applications.

## Installation

To get started, install the template's dependencies using npm install (or pnpm install or yarn).

### Step 1: Install Tauri Plugin

The preferred method is to install Tauri as a development dependency in your app:

```sh
npm install vite-tauri-plugin
```

### Step 2: Configure Vite

In your `vite.config.js` file, import `viteTauriPlugin` from 'tauri-vite-plugin', and add it to your plugins array:

```js
import viteTauriPlugin from "tauri-vite-plugin";

const config = {
    plugins: [viteTauriPlugin()],
};

export default config;
```

### Step 3: Add Tauri to Package.json

In your package.json file, add the following script:

```json
{
    "scripts": {
        "tauri": "tauri"
    }
}
```

## Build Desktop Applications

With this setup, you can now take advantage of Tauri's many features and build desktop applications that run natively on Windows, macOS, and Linux. Get started today!
