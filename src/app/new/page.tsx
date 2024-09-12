import FoodIMG from "@/assets/images/resources/food.webp";
import FavorIMG from "@/assets/images/resources/favor.webp";
import GoldIMG from "@/assets/images/resources/gold.webp";
import WoodIMG from "@/assets/images/resources/wood.webp";
import TimeIMG from "@/assets/images/time.webp";
import VillagersIMG from "@/assets/images/villagers.webp";
import BuildIMG from "@/assets/images/build.webp";
import Image from "next/image";
import { NumberInput, Tooltip } from "@mantine/core";
import { IBuild, IBuildGuideStep } from "@/data/Builds";
import GODS from "@/data/Gods";

const CreateBuildPage = () => {
  return (
    <div className="text-white container m-auto">
      <BuildEditor />
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

const BuildEditor = () => {
  const testBuild: IBuild = {
    name: "Test Build",
    description: "Test build made for testing...",
    author: { username: "Test User", rating: 5.6 },
    gods: [GODS.Zeus, GODS.Oranos],
    steps: [
      {
        description: "Quam fringilla suscipit cursus hendrerit.",
        time: 60,
        isNote: false,
        workingGold: 10,
      },
      {
        description: "Finibus suscipit non dis augue congue.",
        time: 92,
        isNote: false,
      },
      {
        description:
          "Sem nullam ipsum viverra curabitur. Potenti facilisi aliquam magna vivamus potenti habitasse gravida. \nQuisque viverra pulvinar ligula eget lacinia.",
        isNote: true,
      },
      {
        description: "Tempus felis diam vel consectetur eros nunc.",
        time: 120,
        isNote: false,
      },
    ],
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

  return (
    <div className="bg-neutral-800 border-amber-300 border-2 rounded">
      <table>
        <thead>
          <tr>
            {COLUMNS.map(
              (column) =>
                (column.icon && (
                  <th key={column.alt}>
                    <Tooltip label={column.label}>
                      <Image
                        className="m-auto"
                        src={column.icon}
                        alt={column.alt}
                        width={48}
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
          {testBuild.steps.map((step, index) => (
            <tr key={index} className="text-center">
              {!step.isNote && (
                <>
                  <td>{displayTime(step.time)}</td>
                  <td>{villagerCount(step)}</td>
                  <td>
                    <NumberInput
                      className="bg-neutral-400/10"
                      variant="unstyled"
                      hideControls={true}
                      value={step.workingBuilding}
                    />
                  </td>
                  <td>
                    <NumberInput
                      className="bg-red-400/10"
                      variant="unstyled"
                      hideControls={true}
                      value={step.workingFood}
                    />
                  </td>
                  <td>
                    <NumberInput
                      className="bg-orange-400/10"
                      variant="unstyled"
                      hideControls={true}
                      value={step.workingWood}
                    />
                  </td>
                  <td>
                    <NumberInput
                      className="bg-yellow-400/10"
                      variant="unstyled"
                      hideControls={true}
                      value={step.workingGold}
                    />
                  </td>
                  <td>
                    <NumberInput
                      className="bg-blue-400/10"
                      variant="unstyled"
                      hideControls={true}
                      value={step.workingFavor}
                    />
                  </td>
                </>
              )}
              <td colSpan={step.isNote ? 8 : 1} className="text-left">
                {step.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateBuildPage;
