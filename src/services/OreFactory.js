import Stone from "../objects/Stone.js";
import OreName from "../enums/OreName.js";
import Vector from "../../lib/Vector.js";
import Iron from "../objects/Iron.js";
import Gold from "../objects/Gold.js";
import Diamond from "../objects/Diamond.js";

/**
 * Encapsulates all definitions for instantiating new ores.
 */
export default class OreFactory {
	/**
	 * @param {string} type A string using the OreType enum.
	 * @param {array} sprites The sprites to be used for the ore.
	 * @returns An instance of an ore specified by oreType.
	 */
	static createInstance(type, sprites, player, position = new Vector(0, 0)) {
		switch (type) {
			case OreName.Stone:
				return new Stone(sprites, position, player);
			case OreName.Iron:
				return new Iron(sprites, position, player);
			case OreName.Gold:
				return new Gold(sprites, position, player);
			case OreName.Diamond:
				return new Diamond(sprites, position, player);
		}
	}
}
