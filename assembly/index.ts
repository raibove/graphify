import { http, models } from "@hypermode/modus-sdk-as";

import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { Infographic, Product, sampleInfographicJson, sampleProductJson } from "./product";
import { JSON } from "json-as";
const modelName: string = "text-generator";

// Use our LLM to generate text based on an instruction and prompt
export function generateText(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}


export function sayHello(name: string | null = null): string {
// const request = new http.Request("https://hashnode.com/hackathons/hypermode?source=hackathon-feed-widget")
// const resp = http.fetch(request);
// const t = resp.text();
// console.log(t)

const persistent = generateText(
  "You are giving speech on enviroment",
  "Write a speech for importance of trees and greenery"
)
  console.log(persistent)
  return `Hello, ${name || "World"}!`;
}

export function generateProducts(category: string, quantity: i32): Product[] {
  // Similar to the previous example above, we can tailor the instruction and prompt
  // to guide the model in generating the desired output.  Note that understanding the behavior
  // of the model is important to get the desired results.  In this case, we need the model
  // to return an _object_ containing an array, not an array of objects directly.  That's because
  // the model will not reliably generate an array of objects directly.
  const instruction = `Generate ${quantity} products for the category provided.
Only respond with valid JSON object containing a valid JSON array named 'list', in this format:
{"list":[${sampleProductJson}]}`;
  const prompt = `The category is "${category}".`;

  // Set up the input for the model, creating messages for the instruction and prompt.
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  // Adjust the model inputs, just like in the previous example.
  // Be careful, if the temperature is too high, the model may generate invalid JSON.
  input.temperature = 1.2;
  input.responseFormat = ResponseFormat.Json;

  // Here we invoke the model with the input we created.
  const output = model.invoke(input);

  // The output should contain the JSON string we asked for.
  const json = output.choices[0].message.content.trim();

  // We can parse that JSON to a compatible object, to get the data we're looking for.
  const results = JSON.parse<Map<string, Product[]>>(json);
  return results.get("list");
}

export function generateInfographic(title: string, steps: i32, inputType: string): Infographic {
  let instruction = `Generate an infographic with ${steps} steps for the title provided.
  Only respond with valid JSON object containing a valid JSON array named 'list', in this format:
  {"list":[${sampleInfographicJson}]}`;
  let prompt = `The title is "${title}".`;

 if(inputType == 'para') {
    instruction = `Based on the paragraph provided generate infographic with ${steps}.
    Only respond with valid JSON object containing a valid JSON array named 'list', in this format:
    {"list":[${sampleInfographicJson}]} `;
    prompt = `The paragraph is "${title}".`;
  }

  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 1.2;
  input.responseFormat = ResponseFormat.Json;

  const output = model.invoke(input);

  const json = output.choices[0].message.content.trim();

  const results = JSON.parse<Map<string, Infographic[]>>(json);
  return results.get("list")[0];
}