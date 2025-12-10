const { execSync } = require('child_process');

try {
	// Získání statusu git pouze pro složku icons
	// --porcelain dává stabilní formát pro skripty
	const statusOutput = execSync('git status --porcelain icons/', { encoding: 'utf-8' });

	const newIcons = [];
	const refinedIcons = [];

	const lines = statusOutput.split('\n');

	lines.forEach(line => {
		if (!line.trim()) return;

		// První dva znaky jsou status (např. "M ", "??", "A ")
		const status = line.substring(0, 2);
		// Zbytek je cesta k souboru
		const filePath = line.substring(3).trim();

		// Přeskočíme soubory, které nejsou svg (pokud by tam nějaké byly)
		if (!filePath.endsWith('.svg')) return;

		// Získáme čistý název ikony
		const iconName = filePath
			.replace(/^icons\//, '') // Odstraní 'icons/' ze začátku
			.replace(/\.svg$/, '');  // Odstraní '.svg' z konce

		// Logika pro rozřazení
		// ?? = Untracked (nový soubor)
		// A  = Added (nový soubor přidaný do stage)
		if (status.includes('??') || status.includes('A')) {
			newIcons.push(iconName);
		}
		// M  = Modified (upravený)
		else if (status.includes('M')) {
			refinedIcons.push(iconName);
		}
	});

	const messageParts = [];

	if (newIcons.length > 0) {
		messageParts.push(`New icons:\n\n${newIcons.map(name => `- ${name}`).join('\n')}`);
	}

	if (refinedIcons.length > 0) {
		messageParts.push(`Refined icons:\n\n${refinedIcons.map(name => `- ${name}`).join('\n')}`);
	}

	const finalMessage = messageParts.join('\n\n');

	if (finalMessage) {
		console.log(finalMessage);
	} else {
		console.error('Nebyly nalezeny žádné změny v icons/.');
		process.exit(1);
	}

} catch (error) {
	console.error('Chyba při generování commit message:', error);
	process.exit(1);
}

