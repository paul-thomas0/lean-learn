import movement from "./movement.js";
import jumps from "./jumps.js";
import precision from "./precision.js";
import filesBuffers from "./files-buffers.js";
import edit from "./edit.js";
import textObjects from "./text-objects.js";
import surround from "./surround.js";
import windows from "./windows.js";
import search from "./search.js";
import git from "./git.js";
import lsp from "./lsp.js";
import trouble from "./trouble.js";
import uiToggles from "./ui-toggles.js";
import folding from "./folding.js";
import marksMacros from "./marks-macros.js";
import todoComments from "./todo-comments.js";

const ALL_QUESTIONS = [
  ...movement,
  ...jumps,
  ...precision,
  ...filesBuffers,
  ...edit,
  ...textObjects,
  ...surround,
  ...windows,
  ...search,
  ...git,
  ...lsp,
  ...trouble,
  ...uiToggles,
  ...folding,
  ...marksMacros,
  ...todoComments,
];

export default ALL_QUESTIONS;
