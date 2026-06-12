import axios from "axios";

export async function addUser(email, faction) {
	return axios.post('/api/users.php', { email, faction })
}
