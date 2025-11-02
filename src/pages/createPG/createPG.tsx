import { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { setStat } from "../../utils/setStat";
import styles from './createPG.module.scss';

export const CreatePG = () => {
  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");
  const [dexterity, setDexterity] = useState("");
  const [constitution, setConstitution] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [wisdom, setWisdom] = useState("");
  const [charisma, setCharisma] = useState("");
  const [healthPoints, setHealthPoints] = useState("");

  const validateStat = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num < 1 || num > 20) {
      return "Il valore deve essere un numero tra 1 e 20";
    }
  };

  const createCharacter = (e: any) => {
    e.preventDefault();
    const newCharacter: Character = {
      name,
      str: setStat(Number(strength)),
      dex: setStat(Number(dexterity)),
      con: setStat(Number(constitution)),
      int: setStat(Number(intelligence)),
      wis: setStat(Number(wisdom)),
      cha: setStat(Number(charisma)),
      initiative: Number(dexterity),
      ca: 10 + Math.floor((Number(dexterity) - 10) / 2),
      hp: Number(healthPoints),
      temporaryHp: Number(healthPoints)
    };

    console.log("🚀 ~ createCharacter ~ newCharacter:", newCharacter);
  };

  return (
    <div className={styles.creatPG}>
      <Form onSubmit={createCharacter}>
        <TextField value={name} onChange={setName}>
          <Label>Nome Personaggio</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={strength}
          onChange={setStrength}
          validate={validateStat}
        >
          <Label>Forza</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={dexterity}
          onChange={setDexterity}
          validate={validateStat}
        >
          <Label>Destrezza</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={constitution}
          onChange={setConstitution}
          validate={validateStat}
        >
          <Label>Costituzione</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={intelligence}
          onChange={setIntelligence}
          validate={validateStat}
        >
          <Label>Intelligenza</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={wisdom}
          onChange={setWisdom}
          validate={validateStat}
        >
          <Label>Saggezza</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={charisma}
          onChange={setCharisma}
          validate={validateStat}
        >
          <Label>Carisma</Label>
          <Input />
          <FieldError />
        </TextField>
        <TextField
          type="number"
          value={healthPoints}
          onChange={setHealthPoints}
          validate={validateStat}
        >
          <Label>Punti ferita</Label>
          <Input />
          <FieldError />
        </TextField>
        <Button type="submit">Crea Personaggio</Button>
      </Form>
    </div>
  );
};
