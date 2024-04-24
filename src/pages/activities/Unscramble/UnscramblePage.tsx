import { useState } from "react";
import { FormContainer } from "../../../components/containers/FormContainer";
import { Input } from "../../../components/inputs/Input";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";

import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Close } from "../../../assets/icons/Close";
import { getColor } from "../../../helpers/getColor";
import { sleep } from "../../../helpers/sleep";

interface ISentence {
  id: string;
  unscramble: string;
  sentence: string;
  error?: string;
}

const INITIAL_DATA: ISentence[] = [
  { id: "1", unscramble: "Are / you / How / ?", sentence: "" },
 
  { id: "3", unscramble: "am / I / blue", sentence: "" },
  { id: "4", unscramble: "are / you / Where / from  ?", sentence: "" },
];

const SENTENCE_SCHEMA = Yup.string().required("required");

export const UnscramblePage = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: INITIAL_DATA,
    // validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: typeof INITIAL_DATA) {
    const newValues = await Promise.all(
      values.map(async (value) => {
        try {
          await SENTENCE_SCHEMA.validate(value.sentence);
          return { ...value, error: null };
        } catch (error: any) {
          return { ...value, error: error.message };
        }
      })
    );
    formik.setValues(newValues);

    // Verificar si hay un error
    const hasError = newValues.some((value) => value.error);
    if (hasError) {
      toast.error("Por favor , completa todos los campos");
      return;
    }

    //? LO QUE ENVIAMOS AL SERVIDOR ES UN ARREGLO DE INITIAL_DATA
    //? podemos eliminar la propiedad error de cada objeto de INITIAL_DATA

    setLoading(true);
    await sleep(2);
    setLoading(false);

    // navigate("/levels/home");
  }

  const handleClickCleanQuestion = (id: string) => {
    const newValues = formik.values.map((value) => {
      if (value.id === id) {
        return { ...value, sentence: "" };
      }
      return value;
    });

    formik.setValues(newValues);
  };

  const handleChange = (questionId: string, text: string) => {
    formik.setValues((prev) => {
      const newValues = prev.map((value) => {
        if (value.id === questionId) {
          return { ...value, sentence: text, error: undefined };
        }
        return value;
      });
      return newValues;
    });
  };

  return (
    <ActivityLayout
      saveProps={{ className: "   bg-my-brown-700" }}
      nextProps={{ form: "    form-unscramble", type: "submit", className: "bg-my-brown-700", disabled: loading }}
      theme="unscramble"
      acitivityHeader={{
        acitivity: "Unscramble",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Look at the sentence and organize the correct answer",
        info : "Write the sentences in order"
      }}
      primaryColor={getColor("my-brown-700")}
    >
      <div className="w-1/2 max-md:w-full m-auto">
        <form onSubmit={formik.handleSubmit} className="flex flex-col py-5 " id="form-unscramble">
          <FormContainer>
            {INITIAL_DATA.map((question, index) => (
              <Input
                endIcon={
                  <div
                    className="border-2 rounded-full border-my-brown-700"
                    onClick={() => handleClickCleanQuestion(question.id)}
                  >
                    <Close size={18} className="fill-my-brown-700" />
                  </div>
                }
                showLabel
                className="bg-my-brown-100 border-0 border-b-2 outline-2 text-black 
                border-my-brown-700 rounded-sm 
                hover:ring-2 hover:border-transparent hover:border-my-brown-700"
                label={index + 1 + ". " + question.unscramble}
                name={"sentence"}
                key={question.id}
                value={formik.values.find((value) => value.id === question.id)?.sentence}
                onChange={(e) => handleChange(question.id, e.target.value)}
                error={formik.values.find((value) => value.id === question.id)?.error}
              />
            ))}
          </FormContainer>
        </form>
      </div>
    </ActivityLayout>
  );
};
