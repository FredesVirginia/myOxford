import React, { useEffect, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
import { FormContainer } from "../../../components/containers/FormContainer";

interface IText {
  textId: string;
  text: string;
}

interface IQuestion {
  id: string;
  question: string;
  texts: IText[];
}

const INITIAL_DATA = [
  {
    questionId: "1",
    question: "Lorem ipsum dolor sit amet consectetu _",
  },
  {
    questionId: "2",
    question: "_ elit. Aspernatur, asperiores a laborum",
  },
  {
    questionId: "3",
    question: "inventore optio _ mollitia molestiae quos perspiciatis _",
  },
  {
    questionId: "4",
    question: "temporibus minus odit similique _ aliquid eum. Architecto labore ea _ eum ",
  },
];

export const FB_byWordPage = () => {
  //LO QUE RECIBO DEL BACK
  const [requestGET, setRequestGET] = useState<{ questionId: string; question: string }[]>([]);

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    setRequestGET(INITIAL_DATA);
  }, []);

  useEffect(() => {
    const newQuestions: IQuestion[] = requestGET.map((question) => {
      const newQuestion = question.question
        .split(" ")
        .map((word, i) => (word === "_" ? "_" + i : word))
        .join(" ");

      return {
        id: question.questionId,
        question: newQuestion,
        texts: newQuestion
          .split(" ")
          .filter((word) => word.startsWith("_"))
          .map((word) => {
            return {
              textId: word.slice(1),
              text: "",
            };
          }),
      };
    });
    setQuestions(newQuestions);
  }, [requestGET]);

  const handleChange = ({ questionId, text, textId }: { questionId: string; text: string; textId: string }) => {
    if (text.includes(" ")) return;

    const currentQuestion = questions.find((q) => q.id === questionId);
    if (currentQuestion) {
      const indexCurrentQuestion = questions.indexOf(currentQuestion);
      const currentText = currentQuestion.texts.find((w) => w.textId === textId);
      if (currentText) {
        const indexCurrentText = currentQuestion.texts.indexOf(currentText);
        currentText.text = text;
        setQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions[indexCurrentQuestion].texts[indexCurrentText].text = text;
          return newQuestions;
        });
      }
    }
  };

  return (
    <ActivityLayout
      theme="fill-the-blanks"
      acitivityHeader={{
        acitivity: "Fill in the blanks",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Fill in the spaces with the correct word",
        info: "Fill in the blanks with the correct word lorem ipsum dolor sit amet elit",
      }}
      primaryColor={getColor("my-yellow-400")}
    >
      <div className="flex m-auto w-10/12 mt-5 border p-4 rounded-2xl border-gray-400">
        <FormContainer className="gap-5">
          {questions.map((question) => {
            return (
              <div key={question.id} className="flex gap-3 justify-start items-center flex-wrap">
                {question.question.split(" ").map((word, index) => (
                  <React.Fragment key={index}>
                    {word.startsWith("_") ? (
                      <input
                        type="text"
                        className="w-40"
                        value={question.texts.find((w) => w.textId === word.slice(1))!.text ?? "kk"}
                        onChange={({ target }) =>
                          handleChange({ questionId: question.id, text: target.value, textId: word.slice(1) })
                        }
                      />
                    ) : (
                      <p className="text-black">{word}</p>
                    )}
                  </React.Fragment>
                ))}
              </div>
            );
          })}
        </FormContainer>
      </div>
    </ActivityLayout>
  );
};
