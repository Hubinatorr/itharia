// Štruktúra pre navigačný strom vľavo.
// Použijeme rekurzívnu štruktúru, kde každý objekt môže mať 'children'.
export const wikiTree = [
	{
		id: 'geographical-overview',
		type: 'folder',
		name: 'Geographical Overview',
		children: [
			{ id: 'begrun-skurdir', type: 'page', name: 'Begrün Skurðir' },
			{ id: 'aquilonia', type: 'page', name: 'Aquilonia' },
			{ id: 'pansalam', type: 'page', name: 'Pansala\'m' },
		],
	},
	{
		id: 'historical-events',
		type: 'folder',
		name: 'Historical Events',
		children: [
			{ id: 'first-era', type: 'page', name: 'The First Era' },
		],
	},
];

// Obsah jednotlivých stránok. Kľúč je 'id' stránky.
// V praxi by toto prichádzalo z API alebo Markdown súborov.
export const wikiPages = {
	'pansalam': {
		title: 'Pansala\'m',
		category: 'GEOGRAPHICAL OVERVIEW',
		lastUpdated: 'July 13, 2024',
		content: `
      <p>Welcome to Pansala'm, the serene and harmonious home of the Windfolks, comprised of Avians and Minotaurs. Nestled southwest from the center of Celestria, near the majestic Arborn Nuclea and the expansive Celestial Lake, Pansala'm is a place of profound spiritual significance. The Windfolks are the revered keepers of Arborn Nuclea, the magical tree that serves as the heart of the entire island of Celestria.</p>
      <p>The Windfolks of Pansala'm live lives deeply rooted in harmony and balance, reflecting their profound connection to the wind element. Their society is a tranquil blend of spirituality and nature, with every aspect of life designed to maintain equilibrium. Pansala'm is not just a city but the capital of a vast area dominated by Windfolks, where their traditions and customs are upheld with the utmost respect.</p>
      <p>Though the Windfolks are the most respected race on Celestria, they are also the least populated, their small numbers underscoring their unique role as the spiritual leaders and guardians of the island. The Avians, with their ethereal grace, and the Minotaurs, with their grounded strength, coexist in perfect balance, embodying the dual aspects of the wind element.</p>
    `
	},
	'aquilonia': {
		title: 'Aquilonia',
		category: 'GEOGRAPHICAL OVERVIEW',
		lastUpdated: 'June 28, 2024',
		content: `<p>Content for Aquilonia goes here...</p>`
	},
	'begrun-skurdir': {
		title: 'Begrün Skurðir',
		category: 'GEOGRAPHICAL OVERVIEW',
		lastUpdated: 'July 1, 2024',
		content: `<p>Content for Begrün Skurðir goes here...</p>`
	},
	'first-era': {
		title: 'The First Era',
		category: 'HISTORICAL EVENTS',
		lastUpdated: 'May 10, 2024',
		content: `<p>Content about the First Era goes here...</p>`
	}
};
