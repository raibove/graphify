/*
 * This example is part of the Modus project, licensed under the Apache License 2.0.
 * You may modify and use this example in accordance with the license.
 * See the LICENSE file that accompanied this code for further details.
 */

import { JSON } from "json-as";

// The Product class and the sample product will be used in the some of the examples.
// Note that the class must be decorated with @json so that it can be serialized
// and deserialized properly when interacting with OpenAI.
@json
export class Product {
  id: string | null = null;
  name: string = "";
  price: f64 = 0.0;
  description: string = "";
}

export const sampleProductJson = JSON.stringify(<Product>{
  id: "123",
  name: "Shoes",
  price: 50.0,
  description: "Great shoes for walking.",
});


// The Infographic class and the sample infographic will be used in the some of the examples.
// Note that the class must be decorated with @json so that it can be serialized
// and deserialized properly when interacting with OpenAI.
@json
export class Infographic {
  title: Title= {main: "", subtitle: ""};
  steps: Step[] = [];
}

@json
export class Title {
  main: string = "";
  subtitle: string = "";
}

@json
export class Step {
  step: i32 = 0;
  title: string = "";
  icon: string = "";
  content: string = "";
}

export const sampleInfographicJson = JSON.stringify<Infographic>({
  "title": {
    "main": "Understanding CSS Inheritance",
    "subtitle": "Consistent Web Styling Made Simple"
  },
  "steps": [
    {
      "step": 1,
      "title": "What is CSS Inheritance?",
      "icon": "tree-icon",
      "content": "Child elements adopt styles from parent elements, reducing redundant code and ensuring consistency."
    },
    {
      "step": 2,
      "title": "Inherited Properties",
      "icon": "text-icon",
      "content": "Properties like 'color', 'font-family', and 'line-height' are inherited by default. Margins, borders, and widths are not."
    },
    {
      "step": 3,
      "title": "Keywords for Control",
      "icon": "gear-icon",
      "content": "'inherit': Force inheritance. 'initial': Reset to default. 'unset': Combine 'inherit' and 'initial'."
    },
    {
      "step": 4,
      "title": "Best Practices",
      "icon": "checklist-icon",
      "content": "Set global styles in 'body' or ':root', use CSS variables, and avoid unnecessary overrides."
    },
    {
      "step": 5,
      "title": "Troubleshooting",
      "icon": "magnifying-glass-icon",
      "content": "Unintended inheritance? Add explicit styles. Complex nesting? Simplify your CSS hierarchy."
    }
  ]
});
