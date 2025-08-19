// Táto funkcia rekurzívne prehľadá strom a vráti pole s cestou k hľadanému ID
export function findPathById(tree, id, currentPath = []) {
	for (const node of tree) {
		// Vytvoríme novú cestu, aby sme neovplyvnili ostatné vetvy
		const newPath = [...currentPath, { id: node.id, name: node.name, type: node.type }];

		// Našli sme hľadaný prvok
		if (node.id === id) {
			return newPath;
		}

		// Ak má prvok deti, hľadáme v nich ďalej
		if (node.children) {
			const result = findPathById(node.children, id, newPath);
			// Ak sme v deťoch niečo našli, vrátime výsledok
			if (result) {
				return result;
			}
		}
	}
	// V tejto vetve sme nič nenašli
	return null;
}
