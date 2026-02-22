import primitives from "./primitives.js";
import unions from "./unions.js";
import arrays from "./arrays.js";
import objects from "./objects.js";
import functions from "./functions.js";
import narrowing from "./narrowing.js";
import generics from "./generics.js";
import keyof from "./keyof.js";
import conditional from "./conditional.js";
import mapped from "./mapped.js";
import template from "./template.js";
import utility from "./utility.js";
import assertions from "./assertions.js";
import advanced from "./advanced.js";

const ALL_QUESTIONS = [
  ...primitives,
  ...unions,
  ...arrays,
  ...objects,
  ...functions,
  ...narrowing,
  ...generics,
  ...keyof,
  ...conditional,
  ...mapped,
  ...template,
  ...utility,
  ...assertions,
  ...advanced,
];

export default ALL_QUESTIONS;
