import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  type Key,
} from "react-aria-components";
import styles from "./combat.module.scss";

export const Combat = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [charactersInCombat, setCharactersInCombat] = useState<Character[]>([]);

  const getCharacters = async () => {
    try {
      const chractersList = (
        await fetch("http://localhost:5173/characters.json")
      ).json();
      chractersList.then((data) => {
        setCharacters(data);
      });
      const enemiesList = (
        await fetch("http://localhost:5173/enemies.json")
      ).json();
      enemiesList.then((data) => {
        setEnemies(data);
      });
    } catch (error) {
      console.error("🚀 Error fetching characters:", error);
    }
  };

  const handleCharacterSelection = (
    selectedKeys: Key[],
    characterType: Character[]
  ) => {
    const keys = Array.isArray(selectedKeys)
      ? selectedKeys
      : Array.from(selectedKeys ?? []);
    let selectedCharacters: Character[] = [];
    if (keys.length && typeof keys[0] === "object") {
      selectedCharacters = keys as Character[];
    } else {
      selectedCharacters = characterType.filter((c) =>
        keys.includes((c as any).name)
      );
    }
    console.log("🚀 ~ handleCharacterSelection ~ keys:", keys);
    console.log("🚀 ~ Combat ~ selectedCharacters:", selectedCharacters);
    setCharactersInCombat((prev) => {
      const all = [...prev, ...selectedCharacters];
      return all.filter(
        (c, idx, arr) => arr.findIndex((cc) => cc.name === c.name) === idx
      );
    });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className={styles.combat}>
      <h1>Combat Page</h1>
      <div className={styles.characterSelection}>
        <Select
          selectionMode="multiple"
          onChange={(selectedKeys: Key[]) =>
            handleCharacterSelection(selectedKeys, characters)
          }
          value={charactersInCombat.map((c) => c.name)}
        >
          <Label>Seleziona i personaggi in combattimento</Label>
          <Button>
            <SelectValue />
          </Button>
          <Popover>
            <ListBox>
              {characters.map((character) => (
                <ListBoxItem key={character.name} id={character.name}>
                  {character.name}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>
      <div className={styles.characterSelection}>
        <Select
          selectionMode="multiple"
          onChange={(selectedKeys: Key[]) =>
            handleCharacterSelection(selectedKeys, enemies)
          }
          value={charactersInCombat.map((c) => c.name)}
        >
          <Label>Seleziona i nemici in combattimento</Label>
          <Button>
            <SelectValue />
          </Button>
          <Popover>
            <ListBox>
              {enemies.map((enemy) => (
                <ListBoxItem key={enemy.name} id={enemy.name}>
                  {enemy.name}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>
      <div className={styles.fighterList}>
        {charactersInCombat
          .sort((a, b) => (a.initiative > b.initiative ? -1 : 1))
          .map((char) => (
            <div className={styles.charContainer} key={char.name}>
              <h2>{char.name}</h2>
              <p>PF: {char.hp}</p>
              <p>CA: {char.ca}</p>
              <Input
                type="number"
                value={char.initiative}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  const thisChar: Character =
                    charactersInCombat.find((c) => c.name === char.name) ??
                    char;
                  thisChar.initiative = value;
                  setCharactersInCombat((prev) =>
                    prev.map((c) => (c.name === char.name ? thisChar : c))
                  );
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
