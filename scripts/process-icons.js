const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
	// Cesta k rootu projektu
	const rootDir = path.resolve(__dirname, '..');
	const packageJsonPath = path.join(rootDir, 'package.json');

	// 1. Získání statusu git pro složku icons
	const statusOutput = execSync('git status --porcelain icons/', { encoding: 'utf-8', cwd: rootDir });

	const newIcons = [];
	const refinedIcons = [];
	let filesChangedCount = 0;

	const lines = statusOutput.split('\n');

	lines.forEach(line => {
		if (!line.trim()) return;

		const status = line.substring(0, 2);
		const relativeFilePath = line.substring(3).trim();
		const fullFilePath = path.join(rootDir, relativeFilePath);

		if (!relativeFilePath.endsWith('.svg')) return;

		// Získáme název ikony
		const iconName = relativeFilePath
			.replace(/^icons\//, '')
			.replace(/\.svg$/, '');

		// Logika rozřazení
		const isNew = status.includes('??') || status.includes('A');
		const isModified = status.includes('M');

		if (isNew) {
			newIcons.push(iconName);
		} else if (isModified) {
			refinedIcons.push(iconName);
		}

		// 2. Úprava obsahu: #000 -> currentColor
		// Provádíme pouze u souborů, které existují na disku (nejsou smazané 'D')
		if ((isNew || isModified) && fs.existsSync(fullFilePath)) {
			let content = fs.readFileSync(fullFilePath, 'utf-8');
			// Nahradíme #000 nebo #000000 (case insensitive) za currentColor
			const newContent = content.replace(/#000(?:000)?/gi, 'currentColor');

			if (content !== newContent) {
				fs.writeFileSync(fullFilePath, newContent, 'utf-8');
				filesChangedCount++;
			}
		}
	});

	// Pokud nejsou žádné změny v ikonách, končíme (pokud nechceme kompilovat vždy)
	if (newIcons.length === 0 && refinedIcons.length === 0) {
		console.error('Nebyly nalezeny žádné změny v icons/.');
		process.exit(1);
	}

	// 3. Spuštění kompilace
	console.log('Spouštím kompilaci ikon...');
	execSync('npm run compile', { stdio: 'inherit', cwd: rootDir });

	// 4. Úprava verze v package.json
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
	const oldVersion = packageJson.version;
	const versionParts = oldVersion.split('.').map(Number); // [major, minor, patch]

	if (newIcons.length > 0) {
		// Nové ikony -> zvyšujeme minor verzi (+0.1.0)
		versionParts[1]++;
		versionParts[2] = 0;
	} else {
		// Pouze úpravy -> zvyšujeme patch verzi (+0.0.1)
		versionParts[2]++;
	}

	const newVersion = versionParts.join('.');
	packageJson.version = newVersion;

	// Zápis package.json (zachováme formátování 2 mezer)
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
	console.log(`Verze aktualizována: ${oldVersion} -> ${newVersion}`);

	// 5. Generování commit message
	const messageParts = [];

	if (newIcons.length > 0) {
		messageParts.push(`New icons:\n\n${newIcons.map(name => `- ${name}`).join('\n')}`);
	}

	if (refinedIcons.length > 0) {
		messageParts.push(`Refined icons:\n\n${refinedIcons.map(name => `- ${name}`).join('\n')}`);
	}

	const finalMessage = messageParts.join('\n\n');
	console.log('\n--- Commit Message ---\n');
	console.log(finalMessage);

} catch (error) {
	console.error('Chyba při zpracování ikon:', error);
	process.exit(1);
}
