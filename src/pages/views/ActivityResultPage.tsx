import { useLocation, useNavigate } from "react-router";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { TBackgroundLayout } from "../../types/types";

import { t } from "i18next";
import G_HAPPY from "../../assets/logos/g_happy.png";
import G_SAD from "../../assets/logos/G_SAD.png";

interface IError {
  questionId: string;
  answerId: string;
  errorAnswer: string;
  successAnswer: string;
}

interface IParams {
  status: "g_happy" | "g_sad";
  theme: TBackgroundLayout;
  primaryColor: string;
  breadcrumb: string;
  errors?: IError[];
  activityName: string;
  grade: string;
}

export const ActivityResultPage = () => {
  const { state } = useLocation() as { state: IParams };
  const {
    status,
    theme,
    primaryColor,
    errors = [],
    breadcrumb = "breadcrum",
    activityName = "Activity Name",
    grade = "4/5",
  } = state;

  const navigate = useNavigate();

  const getImage = () => {
    switch (status) {
      case "g_happy":
        return G_HAPPY;
      case "g_sad":
        return G_SAD;
    }
  };

  const handleClickReturnToWorld = () => {
    // window.location.href = "/";
    navigate("/");
  };

  return (
    <div className="overflow-y-hidden" id={primaryColor}>
      <BackgroundLayout theme={theme}>
        <div className="h-screen w-full p-6">
          <section className="bg-white w-full h-full rounded-3xl p-5 flex flex-col gap-5">
            <div className="w-full h-full overflow-y-auto">
              <div className="flex justify-between flex-wrap gap-4">
                <div className="text-sm font-medium" style={{ color: primaryColor }}>
                  {breadcrumb}
                </div>
                <button className="bg-my-skyBlue-500" onClick={handleClickReturnToWorld}>
                  {t("returnWorld")}
                </button>
              </div>
              <div className="flex flex-col justify-center items-center  gap-3">
                <div className="h-52 max-sm:w-full max-md:w-2/3 md:w-1/2 lg:w-1/3">
                  <img src={getImage()} alt="status-image" className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <p className="text-my-skyBlue-300 text-4xl mb-2 font-bold">{t("congrats")}</p>
                  <p className="text-sm font-light">
                    {t("doneActivity")}
                    {activityName}
                  </p>
                </div>
              </div>
              <div className="w-10/12 m-auto flex gap-8 flex-wrap max-sm:flex-col mt-12 justify-between items-center [&>*]:font-medium">
                {/* GRADE CONTAINER  */}
                <div
                  style={{ backgroundColor: primaryColor }}
                  className={`grade basis-44 h-20 max-sm:basis-0 py-3 px-5 rounded-xl flex gap-3 items-center justify-center`}
                >
                  <p className="text-white font-bold">{t("grade")}</p>
                  <p className="text-white font-bold text-5xl">{grade}</p>
                </div>
                {/* RESULT CONTAINER */}

                {errors?.length === 0 && (
                  <div className="result flex flex-col gap-3 flex-1 [&>*]:text-sm">
                    <p style={{ color: primaryColor }} className="text-center font-black !text-4xl">
                      {t("doingGreat")}
                    </p>
                    <p style={{ color: primaryColor }} className="text-center font-medium !text-4xl opacity-70">
                      {t("keepRocking")}
                    </p>
                  </div>
                )}

                {errors?.length > 0 && (
                  <div className="result flex flex-col gap-3 flex-1 [&>*]:text-sm">
                    <p className="text-center font-light">{t("youFailExercise")}</p>
                    <div className="flex gap-5 flex-wrap max-md:flex-col [&>div]:rounded-lg [&>div]:p-3 w-10/12 m-auto">
                      <div className="bg-gray-100 flex-1">
                        <p className="text-black">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ad? Distinctio cupiditate facere
                          voluptas tempora itaque necessitatibus minima amet!
                        </p>
                      </div>
                      <div className="bg-red-300 flex-1">
                        <p className="text-white">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ad? Distinctio cupiditate facere
                          voluptas tempora itaque necessitatibus minima amet!
                        </p>
                      </div>
                    </div>
                    {/* CORRECT ANSWER CONTAINER */}
                    <div className="flex gap-2 px-10 flex-wrap max-md:flex-col">
                      <p className="basis-25 text-right max-md:text-center text-my-semantic-success-700 font-light">
                        Correct Answer:
                      </p>
                      <p className="flex-1 text-my-semantic-success-700">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae consequuntur aliquid aperiam
                        quaerat praesentium debitis, magnam necessitatibus earum
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </BackgroundLayout>
    </div>
  );
};
