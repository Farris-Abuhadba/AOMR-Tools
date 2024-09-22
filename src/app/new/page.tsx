"use client";

import FoodIMG from "@/assets/images/resources/food.webp";
import FavorIMG from "@/assets/images/resources/favor.webp";
import GoldIMG from "@/assets/images/resources/gold.webp";
import WoodIMG from "@/assets/images/resources/wood.webp";
import TimeIMG from "@/assets/images/time.webp";
import VillagersIMG from "@/assets/images/villagers.webp";
import Age1IMG from "@/assets/images/ages/I.webp";
import Age2IMG from "@/assets/images/ages/II.webp";
import Age3IMG from "@/assets/images/ages/III.webp";
import Age4IMG from "@/assets/images/ages/IV.webp";
import Age5IMG from "@/assets/images/ages/V.webp";
import BuildIMG from "@/assets/images/build.webp";
import InfoIMG from "@/assets/images/info.webp";
import Image from "next/image";
import { IBuild, IBuildGuide, IBuildGuideStep } from "@/data/Builds";
import GODS, { Ages, Pantheons } from "@/data/Gods";
import {
  Button,
  MultiSelect,
  NumberInput,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useMemo, useState } from "react";

const CreateBuildPage = () => {
  const [build, setBuild] = useState<IBuild>({
    name: "My Build",
    description: "My build description",
    author: { username: "Test User", rating: 5.6 },
    gods: [GODS.Zeus],
    guide: {
      i: [
        { isNote: false, description: "", workingBuilding: 10 },
        { isNote: false, description: "", workingFood: 10 },
        { isNote: false, description: "", workingWood: 10 },
        { isNote: false, description: "", workingGold: 10 },
        { isNote: false, description: "", workingFavor: 10 },
      ],
    },
  });

  const groupedGods = useMemo(
    () =>
      Object.values(Pantheons)
        .filter((v) => isNaN(Number(v)))
        .map((pantheon) => ({
          group: pantheon,
          items: Object.values(GODS)
            .filter((g) => g.pantheon === pantheon)
            .map((g) => g.name),
        })),
    [],
  );

  function setGods(gods: string[]) {
    setBuild((oldBuild) => ({
      ...oldBuild,
      gods: gods.map((name) => GODS[name]),
    }));
  }

  return (
    <div className="container m-auto text-base-content">
      <div>
        <TextInput
          label="Build Name"
          defaultValue={build.name}
          placeholder={"Build Name"}
          onBlur={(e) => {
            setBuild({ ...build, name: e.target.value });
          }}
        />
        <Textarea
          defaultValue={build.description}
          placeholder="Build Description"
          label="Build Description"
          autosize
          minRows={4}
          maxRows={10}
          onBlur={(e) => {
            setBuild({ ...build, description: e.target.value });
          }}
        />
        <MultiSelect
          label="Gods"
          description="Which Gods this build is meant for"
          value={build.gods.map((g) => g.name)}
          onChange={setGods}
          searchable
          nothingFoundMessage="No results"
          data={groupedGods}
        />
      </div>
      <BuildGuideEditor
        guide={build.guide}
        setGuide={(newGuide) => {
          setBuild((oldBuild) => ({ ...oldBuild, guide: { ...newGuide } }));
        }}
      />
      <Button>Submit Build</Button>
    </div>
  );
};

const COLUMNS = [
  { label: "Match Timer", alt: "Time", icon: TimeIMG },
  { label: "Total Villagers", alt: "Villagers", icon: VillagersIMG },
  { label: "Villagers Building", alt: "Building", icon: BuildIMG },
  { label: "Villagers Working Food", alt: "Food", icon: FoodIMG },
  { label: "Villagers Working Wood", alt: "Wood", icon: WoodIMG },
  { label: "Villagers Working Gold", alt: "Gold", icon: GoldIMG },
  { label: "Villagers Working Favor", alt: "Favor", icon: FavorIMG },
  { label: "Description", alt: "Description" },
];

interface BuildGuideEditorProps {
  guide: IBuildGuide;
  setGuide: (newGuide: IBuildGuide) => void;
}
const BuildGuideEditor = ({ guide, setGuide }: BuildGuideEditorProps) => {
  function setSteps(
    age: "i" | "ii" | "iii" | "iv" | "v",
    steps: IBuildGuideStep[],
  ) {
    setGuide({
      ...guide,
      [age]: steps,
    });
  }

  return (
    <div className="constantia p-4">
      <table className="opacity-80 w-full">
        <thead>
          <tr>
            {COLUMNS.map(
              (column) =>
                (column.icon && (
                  <th key={column.alt} className="constantia-bold">
                    <Tooltip label={column.label}>
                      <Image
                        className="m-auto"
                        src={column.icon}
                        alt={column.alt}
                        width={48}
                        height={48}
                      />
                    </Tooltip>
                  </th>
                )) || (
                  <th key={column.alt} className="text-left">
                    {column.label}
                  </th>
                ),
            )}
          </tr>
        </thead>
        <tbody>
          <AgeGroup
            age="I"
            steps={guide.i ?? []}
            setSteps={(steps) => setSteps("i", steps)}
          />

          <AgeGroup
            age="II"
            steps={guide.ii ?? []}
            setSteps={(steps) => setSteps("ii", steps)}
          />

          <AgeGroup
            age="III"
            steps={guide.iii ?? []}
            setSteps={(steps) => setSteps("iii", steps)}
          />

          <AgeGroup
            age="IV"
            steps={guide.iv ?? []}
            setSteps={(steps) => setSteps("iv", steps)}
          />

          <AgeGroup
            age="V"
            steps={guide.v ?? []}
            setSteps={(steps) => setSteps("v", steps)}
          />
        </tbody>
      </table>
    </div>
  );
};

function displayTime(time: number | undefined) {
  if (time === undefined) return undefined;

  let result = "";

  const min = Math.floor(time / 60);
  result += min;
  result += ":";
  const sec = (time - min * 60) % 60;
  result += sec < 10 ? "0" + sec : sec;

  return result;
}

function villagerCount(step: IBuildGuideStep) {
  if (
    step.workingBuilding === undefined &&
    step.workingFood === undefined &&
    step.workingWood === undefined &&
    step.workingGold === undefined &&
    step.workingFavor === undefined
  )
    return undefined;

  const building = step.workingBuilding ?? 0;
  const food = step.workingFood ?? 0;
  const wood = step.workingWood ?? 0;
  const gold = step.workingGold ?? 0;
  const favor = step.workingFavor ?? 0;

  return building + food + wood + gold + favor;
}

interface AgeGroupProps {
  age: "I" | "II" | "III" | "IV" | "V";
  steps: IBuildGuideStep[];
  setSteps: (newSteps: IBuildGuideStep[]) => void;
}

const AgeIcons = {
  I: Age1IMG,
  II: Age2IMG,
  III: Age3IMG,
  IV: Age4IMG,
  V: Age5IMG,
};

const AgeGroup = ({ age, steps, setSteps }: AgeGroupProps) => {
  function updateStep(step: IBuildGuideStep, index: number) {
    setSteps(steps.toSpliced(index, 1, { ...step }));
  }

  return (
    <>
      <tr>
        <td colSpan={8}>
          <div className="font-bold text-2xl flex items-center gap-2 gradient-text uppercase mt-4">
            <Image src={AgeIcons[age]} alt="" width={28} height={28} />
            {Ages[age]} Age
          </div>
        </td>
      </tr>

      {steps.map((step, index) => {
        return (
          <tr
            key={`${index}-${step.time}${step.workingBuilding}${step.workingFood}${step.workingWood}${step.workingGold}${step.workingFavor}${step.description}`}
            className="text-center hover:bg-opacity-100 hover:bg-base-100"
          >
            {!step.isNote && (
              <>
                <td>
                  <ColumnTimeInput
                    value={displayTime(step.time)}
                    setValue={(val) => {
                      step.time = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
                <td>
                  <Text>{villagerCount(step)}</Text>
                </td>
                <td className="bg-neutral-400/20">
                  <ColumnNumberInput
                    value={step.workingBuilding}
                    setValue={(val) => {
                      step.workingBuilding = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
                <td className="bg-red-400/20 p-0">
                  <ColumnNumberInput
                    value={step.workingFood}
                    setValue={(val) => {
                      step.workingFood = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
                <td className="bg-amber-900/20">
                  <ColumnNumberInput
                    value={step.workingWood}
                    setValue={(val) => {
                      step.workingWood = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
                <td className="bg-yellow-400/20">
                  <ColumnNumberInput
                    value={step.workingGold}
                    setValue={(val) => {
                      step.workingGold = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
                <td className="bg-sky-400/20">
                  <ColumnNumberInput
                    value={step.workingFavor}
                    setValue={(val) => {
                      step.workingFavor = val;
                      updateStep(step, index);
                    }}
                  />
                </td>
              </>
            )}
            <td colSpan={step.isNote ? 8 : 1}>
              <div className="flex gap-2 items-center">
                <Textarea
                  leftSection={
                    step.isNote && (
                      <Image src={InfoIMG} alt="" className="w-6 h-6" />
                    )
                  }
                  defaultValue={step.description}
                  onBlur={(e) => {
                    step.description = e.target.value;
                    updateStep(step, index);
                  }}
                  autosize
                  className="w-full"
                />
                <Button
                  color="red"
                  className="shrink-0"
                  onClick={() => {
                    setSteps(steps.toSpliced(index, 1));
                  }}
                >
                  Remove
                </Button>
              </div>
            </td>
          </tr>
        );
      })}

      <tr>
        <td colSpan={8}>
          <div className="flex gap-2 m-4">
            <Button
              onClick={() => {
                steps.push({ isNote: false, description: "" });
                setSteps(steps);
              }}
            >
              Add Step
            </Button>
            <Button
              onClick={() => {
                steps.push({ isNote: true, description: "" });
                setSteps(steps);
              }}
              color="gray"
            >
              Add Note
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

interface ColumnNumberInputProps {
  value?: number | string;
  setValue: (value: number | undefined) => void;
}

const ColumnNumberInput = ({ value, setValue }: ColumnNumberInputProps) => {
  return (
    <NumberInput
      defaultValue={value}
      min={0}
      max={999}
      onBlur={(e) => {
        const val = parseInt(e.target.value);
        if (isNaN(val)) {
          setValue(undefined);
          return;
        }

        setValue(Math.min(Math.max(0, val), 999));
      }}
      hideControls
      styles={{
        input: {
          // backgroundColor: "transparent",
          textAlign: "center",
          width: "50px",
        },
      }}
    />
  );
};

const ColumnTimeInput = ({ value, setValue }: ColumnNumberInputProps) => {
  function timeToSeconds(time: string) {
    const split = time.split(":");
    if (split.length === 1 && (split[0] === "" || isNaN(parseInt(split[0]))))
      return undefined;
    let secs = Math.max(0, parseInt(split.pop() ?? "0"));
    if (isNaN(secs)) secs = 0;
    let mins = Math.max(0, parseInt(split.pop() ?? "0"));
    if (isNaN(mins)) mins = 0;

    return Math.min(mins * 60 + secs, 86400);
  }

  return (
    <TextInput
      defaultValue={value}
      onBlur={(e) => {
        const secs = timeToSeconds(e.target.value);
        setValue(secs);
        e.target.value = displayTime(secs) ?? "";
      }}
    />
  );
};

export default CreateBuildPage;
