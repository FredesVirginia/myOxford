import fox from "../../assets/logos/fox.svg";
import rabbit from "../../assets/logos/rabbit.png";

export const AuthMaskLayout = () => {
  return (
    <div className=" w-full h-screen top-0 absolute  max-sm:hidden">
      <div className="rabbit  w-56 h-56 absolute right-0 -translate-x-32 translate-y-20">
        <img src={rabbit} alt="rabbit" className="h-full w-full object-contain" />
      </div>
      <div className="g_happy  w-56 h-56 absolute bottom-0 translate-x-32 -translate-y-20">
        <img src={fox} alt="g_happy" className="h-full w-full object-contain" />
      </div>
    </div>
  );
};
