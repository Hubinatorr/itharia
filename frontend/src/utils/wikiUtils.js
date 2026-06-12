export function findPathById(tree, id, currentPath = []) {
	for (const node of tree) {
		const newPath = [...currentPath, { id: node.id, name: node.name, type: node.type }];

		if (node.id === id) {
			return newPath;
		}

		if (node.children) {
			const result = findPathById(node.children, id, newPath);
			if (result) {
				return result;
			}
		}
	}

	return null;
}
