
/**
 * This class is responsible for reading and writing the user data and data
 * of our game to and from the browser's local storage. Local storage
 * is a simple way to store small key/value pairs (kind of like cookies)
 * for a particular domain on your browser.
 *
 */
export default class GameSaveManager {
	static loadPlayerData() {
		/**
		 * Since the data is  being saved as a string containing JSON,
		 * we must parse the string into a valid JavaScript object in order
		 * to manipulate it.
		 */
		const playerData = localStorage.getItem('player');
        const data = playerData ? JSON.parse(playerData) : null;
        return data;
	}

	static savePlayerData(player) {
		const saveData = {
			backpack: player.backpack,
			pickaxe: player.pickaxe,
			time: player.totalTime,
			health: player.health
		}
		localStorage.setItem('player', JSON.stringify(saveData));
	}
}
