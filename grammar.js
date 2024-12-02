/**
 * @file Horn parser
 * @author Giannos Chatziagapis <giannos.chatziagapis@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "horn",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
