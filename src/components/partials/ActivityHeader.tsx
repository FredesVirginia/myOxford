import { Info } from "../../assets/icons/Info";
import { getColor } from "../../helpers/getColor";

export interface IActivityHeader {
  acitivity: string;
  quest: string;
  description: string;
  instruction: string;
  info?: string;

  // Propiedades para cambiar el nombre de la actividad
  color?: string;
}

export const ActivityHeader = ({ acitivity, description, instruction, quest, color, info }: IActivityHeader) => {
  return (
    <div className="w-full h-auto rounded-2xl " style={{ zIndex: 100 }}>
      <div className="flex gap-2 items-center z-50">
        <h1 className="text-violet-500 font-extrabold text-xl" style={{ color }}>
          {acitivity}
        </h1>
        {info && (
          <div className="cursor-pointer p-1 -translate-x-2 -translate-y-1 relative z-50 group">
            <Info size={15} fill={getColor("my-skyBlue-500")} />
            <div
              className={`transition-all shadow-md p-2 w-max min-w-40 z-50 max-w-52 text-sm  rounded-xl invisible
            bg-sky-200 absolute cursor-default top-0 rigt-0 group-hover:visible `}
            >
              {info}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 [&>div>p]:text-sm [&>div>p]:text-my-purple-900">
        <div className="">
          <p>{quest}</p>
          <p>{description}</p>
        </div>
        <div>
          <p>
            <b className="text-my-purple-900">Instruction: </b>
            {instruction}
          </p>
        </div>
      </div>
    </div>
  );
};
