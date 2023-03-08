import { spawn } from 'child_process';

/**
 * Tauri plugin for Vite development server
 * @returns {import('vite').Plugin} - An object with plugin configuration
 */
export default function TauriPlugin() {
    
	function yellowText(text) {
		/** yellow text start ${text} color text end */
		return `\x1b[38;2;255;193;49m${text}\u001b[0m`;
	}

	/**
	 * Starts the Tauri process with the given Vite URL
	 * @param {import('http').Server} httpServer - The HTTP server instance with an address method
	 */
	function startTauriProcess(httpServer) {
		const viteUrl = `http://localhost:${httpServer.address().port}/`;

		const tauriProcess = spawn(
			`npm run tauri dev -- --config {\\"build\\":{\\"devPath\\":\\"${viteUrl}\\"}}`,
			{ shell: true }
		);

		/**
		 * Logs the Tauri process output with the '[tauri]' prefix in yellow color
		 * @param {Buffer} data - The output data buffer
		 */
		function logOutput(data) {
			const lineSplitted = data.toString().split('\n');
			``;
			lineSplitted.forEach((line, i) => {
				if (i !== lineSplitted.length - 1 || line !== '') {
					if (line.includes(`tauri dev --config {"build":{"devPath":"${viteUrl}"}}`))
						line = line.replace(/tauri dev.*/, 'tauri dev');
					console.log(yellowText('[tauri]'), line);
				}
			});
		}

		tauriProcess.stdout.on('data', logOutput);
		tauriProcess.stderr.on('data', logOutput);
	}

	/**
	 * @param {{ httpServer: import('http').Server | null }} server
	 */
	function configureServer(server) {
		server.httpServer?.addListener('listening', () => {
			startTauriProcess(server.httpServer);
		});
	}

	return {
		name: 'tauri-plugin',
		configureServer,
		configurePreviewServer: configureServer
	};
}