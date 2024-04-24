import { MatchItem } from "../../../components/items/MatchItem";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { MatchColumns } from "../../../components/partials/MatchColumns";

interface IItem {
  id: string;
  name: string;
  img?: string;
}

interface Description {
  id: string;
  description: string;
}

const ANIMALS: IItem[] = [
  {
    id: "text-5",
    name: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim ",
  },
  {
    id: "text-7",
    name: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim ",
  },
  {
    id: "text-1",
    name: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim ",
  },
  // { id: "text-3", name: "Elephant" },
  // { id: "text-6", name: "Dog" },
  // { id: "text-4", name: "Snake" },
  // { id: "text-2", name: "Lion" },
];

const DESCRIPTIONS: Description[] = [
  {
    id: "text-text-3",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim ",
  },
  {
    id: "text-text-5",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim `,
  },
  {
    id: "text-text-7",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero deserunt cupiditate expedita quisquam? Obcaecati reprehenderit repellat exercitationem provident enim ",
  },
  // { id: "text-text-4", description: "Snake" },
  // { id: "text-text-2", description: "Lion" },
  // { id: "text-text-1", description: "Tiger" },
  // { id: "text-text-6", description: "Dog" },
];

const renderAnimalItem = (item: IItem, selected: IItem | undefined) => {
  return (
    <MatchItem className={`rounded-none border-0 hover:bg-orange-50  ${selected?.id === item.id ? "bg-orange-100  hover:bg-orange-100" : ""}`}>
      {item.name}
    </MatchItem>
  );
};

const renderDescriptionItem = (item: Description, selected: Description | undefined) => {
  return (
    <MatchItem className={`rounded-none border-0 hover:bg-orange-50 ${selected?.id === item.id ? "bg-orange-100 hover:bg-orange-100" : ""}`}>
      {item.description}
    </MatchItem>
  );
};

export const MTC_TextTextPage = () => {
  return (
    <ActivityLayout
      theme="match-columns"
      acitivityHeader={{
        acitivity: "Match The Columns",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Following the next chart match the description to the type of noun.",
      }}
    >
      <center className="w-full">
        <div className="">
          <MatchColumns
            containerProps={{ className: "!gap-0" }}
            listProps={{ className: "!gap-0" }}
            containerItemProps={{ className: "odd:bg-purple-100 even:bg-gray-100" }}
            titleProps={{ className: "bg-purple-200 rounded-none" }}
            showHeader
            start={{
              list: ANIMALS,
              renderItem: renderAnimalItem,
              title: "COMMON NOUN",
            }}
            end={{
              list: DESCRIPTIONS,
              renderItem: renderDescriptionItem,
              title: "PROPER NOUN",
            }}
            onConnectionsChange={(connections) => console.log("connections", connections)}
            connections={[{ start: ANIMALS[1], end: DESCRIPTIONS[2] }]}
          />
        </div>
      </center>
    </ActivityLayout>
  );
};
