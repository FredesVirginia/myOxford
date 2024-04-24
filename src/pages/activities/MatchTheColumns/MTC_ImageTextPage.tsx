import { MatchItem } from "../../../components/items/MatchItem";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { MatchColumns } from "../../../components/partials/MatchColumns";

interface IItem {
  id: string;
  imageName: string;
  img: string;
}

interface Description {
  id: string;
  description: string;
}

const ANIMALS: IItem[] = [
  {
    id: "text-5",
    img: "https://5.imimg.com/data5/ECOM/Default/2022/12/HO/MH/YJ/77921537/3-a9cea819-ff0a-4662-96cb-43f85db5cb7c-500x500.png",
    imageName: "text-5",
  },
  {
    id: "text-7",
    img: "https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-15/carousel/blue-4.png",
    imageName: "text-7",
  },
  {
    id: "text-1",
    img: "https://www.frutality.es/wp-content/uploads/manzana-royal.png",
    imageName: "text-1",
  },
];

const DESCRIPTIONS: Description[] = [
  {
    id: "text-text-3",
    description: "Apple",
  },
  {
    id: "text-text-5",
    description: "Sweater",
  },
  {
    id: "text-text-7",
    description: "Phone",
  },
  // { id: "text-text-4", description: "Snake" },
  // { id: "text-text-2", description: "Lion" },
  // { id: "text-text-1", description: "Tiger" },
  // { id: "text-text-6", description: "Dog" },
];

const renderAnimalItem = (item: IItem, selected: IItem | undefined) => {
  return (
    <MatchItem
      className={`border !rounded-xl h-36 hover:bg-orange-50 ${
        selected?.id === item.id ? "bg-orange-100 hover:bg-orange-100" : ""
      }`}
    >
      <div className="w-full h-full">
        <img src={item.img} alt={item.imageName} className="w-full h-full object-contain" />
      </div>
    </MatchItem>
  );
};

const renderDescriptionItem = (item: Description, selected: Description | undefined) => {
  return (
    <MatchItem
      className={`border !rounded-xl h-36  hover:bg-orange-50 overflow-y-auto ${
        selected?.id === item.id ? "bg-orange-100 hover:bg-orange-100" : ""
      }`}
    >
      <div className="grid h-full place-content-center">{item.description}</div>
    </MatchItem>
  );
};

export const MTC_ImageTextPage = () => {
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
            // minWidthItem="75px"
            // maxWidthItem="1fr"
            containerProps={{ className: "!gap-0 grid grid-cols-[150px_1fr_150px] px-20" }}
            // listProps={{ className: "!gap-0" }}
            containerItemProps={{ className: "" }}
            titleProps={{ className: "bg-purple-200 rounded-none" }}
            showHeader={false}
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
