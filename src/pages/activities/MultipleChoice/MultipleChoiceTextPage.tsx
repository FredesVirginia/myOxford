import { useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";

interface IOption {
  id: string;
  option: string;
}

interface IQuestion {
  id: string;
  question: string;
  options: IOption[];
}

interface IResponse {
  questionId: string;
  optionId: string;
}

const INITIAL_DATA: IQuestion[] = [
  {
    id: "1",
    question: "Lorem ipsum dolor sit amet consectetu _",
    options: [
      {
        id: "1",
        option: "Lorem ipsum dolor sit amet",
      },
      {
        id: "2",
        option: "Lorem ipsum dolor sit",
      },
      {
        id: "3",
        option: "Lorem ipsum dolor",
      },
    ],
  },
  {
    id: "2",
    question: "_ elit. Aspernatur, asperiores a laborum",
    options: [
      { id: "1", option: "elit. Aspernatur, asperiores a laborum" },
      { id: "2", option: "elit. Asperiores a laborum" },
      { id: "3", option: "elit. Asperiores laborum" },
    ],
  },
  {
    id: "3",
    question: "inventore optio _ mollitia molestiae quos perspiciatis _",
    options: [
      { id: "1", option: "inventore optio mollitia molestiae quos perspiciatis" },
      { id: "2", option: "inventore optio mollitia molestiae quos perspiciatis" },
      { id: "3", option: "inventore optio mollitia molestiae quos perspiciatis" },
    ],
  },
  {
    id: "4",
    question: "temporibus minus odit similique _ aliquid eum. Architecto labore ea _ eum",
    options: [
      { id: "1", option: "temporibus minus odit similique aliquid eum. Architecto labore ea eum" },
      { id: "2", option: "temporibus minus odit similique aliquid eum. Architecto labore ea eum" },
      { id: "3", option: "temporibus minus odit similique aliquid eum. Architecto labore ea eum" },
    ],
  },
];

export const MultipleChoiceTextPage = () => {
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] = useState<IResponse[]>([]);

  const onSelectResponse = (questionId: string, optionId: string) => {
    const responseFound = responses.find((resp) => resp.questionId === questionId);
    if (responseFound) {
      setResponses((prev) => prev.map((resp) => (resp.questionId === questionId ? { ...resp, optionId } : resp)));
    } else {
      setResponses((prev) => [...prev, { questionId, optionId }]);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <ActivityLayout
      nextProps={{ form: "form-unscramble", type: "submit", disabled: loading, onClick: handleSubmit }}
      theme="multiple-choice"
      acitivityHeader={{
        acitivity: "Multiple Choice",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Select the best option matching with the sentence",
      }}
      primaryColor={getColor("my-blue-500")}
    >
      <div className="w-10/12 m-auto mt-5 max-md:w-full">
        <p className="text-blue-900 font-bold text-sm">
          What could it be the best season to surf at the beach with warm water, perfect sun and a friendly enviroment
        </p>
        <div className="mt-5 flex flex-col gap-10">
          {INITIAL_DATA.map((question) => (
            <div key={question.id} className="flex flex-col gap-1">
              <p className="text-blue-900 font-bold text-sm">{question.question}</p>
              <div className="flex gap-3 flex-col">
                {question.options.map((option, index) => (
                  <div
                    key={option.id}
                    className={`flex gap-3 ring-1 border-0 ring-gray-200 items-center 
                    p-4 cursor-pointer rounded-xl max-sm: mx-1
                    hover:ring-blue-900 group transition-all ${
                      responses.some(
                        (response) => response.questionId === question.id && response.optionId === option.id
                      )
                        ? "ring-2 !ring-blue-900 selected"
                        : ""
                    }`}
                    onClick={() => onSelectResponse(question.id, option.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded-md ring-1 border-0 ring-gray-200 
                      group-[.selected]:ring-blue-900 
                      group-[.selected]:ring-2 
                    flex justify-center items-center transition-all`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-sm">{option.option}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ActivityLayout>
  );
};
