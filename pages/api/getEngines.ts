import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
  //   an array here cos the options(which has value and label) will be an array of options
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  res.status(200).json({
    modelOptions,
  });
}
