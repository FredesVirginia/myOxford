import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { MatchItem } from "../../../components/items/MatchItem";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { LoadingLayout } from "../../../components/layouts/LoadingLayout";
import { MatchColumns } from "../../../components/partials/MatchColumns";
import { sleep } from "../../../helpers/sleep";

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
    imageName: "Sweater",
  },
  {
    id: "text-7",
    img: "https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-15/carousel/blue-4.png",
    imageName: "Phone",
  },
  {
    id: "text-1",
    img: "https://www.frutality.es/wp-content/uploads/manzana-royal.png",
    imageName: "Apple",
  },
];

const DESCRIPTIONS: Description[] = [
  {
    id: "text-text-3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente distinctio similique velit recusandae facere, molestiae voluptatum minus corrupti Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "text-text-5",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente distinctio similique velit recusandae facere, molestiae voluptatum minus corrupti Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "text-text-7",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente distinctio similique velit recusandae facere, molestiae voluptatum minus corrupti Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
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
      <div className="flex items-center w-1/2  h-full">
        <div className="w-full h-full">
          <img src={item.img} alt={item.imageName} className="w-full h-full object-contain" />
        </div>
        <p>{item.imageName}</p>
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

<div className="w-"></div>;

export const MTC_TextImageTextPage = () => {
  const [sendingData, setSendingData] = useState(false);

  const navigate = useNavigate();

  const handleClickNext = async () => {
    setSendingData(true);
    toast.success("Enviando datos...", { position: "bottom-right" });
    await sleep(2);
    setSendingData(false);
    // Enviar los datos de la respuesta a la siguiente pagina

    const data = {
      //
      level: 1,
      activity: "MC_TextImageTextPage",
      status: "g_happy",
      theme: "match-columns",
      primaryColor: "#8533FF",
    };

    navigate("/levels/activity-result", {
      state: data,
    });
    console.log("handleClickNext");
  };

  const handleClickSave = () => {
    console.log("handleClickSave");
  };

  if (sendingData) return <LoadingLayout />;

  return (
    <ActivityLayout
      theme="match-columns"
      acitivityHeader={{
        acitivity: "Match The Columns",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Following the next chart match the description to the type of noun.",
      }}
      nextProps={{ onClick: handleClickNext }}
      saveProps={{ onClick: handleClickSave }}
    >
      <center className="w-full">
        <div className="">
          <MatchColumns
            // minWidthItem="75px"
            // maxWidthItem="1fr"
            // containerProps={{ className: "!gap-0 grid grid-cols-[200px_1fr_200px] px-20" }}
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
