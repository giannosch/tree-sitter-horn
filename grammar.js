/**
 * @file Horn parser
 * @author Giannos Chatziagapis <giannos.chatziagapis@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "horn",

  extras: $ => [
    /\s/,
    $.comment
  ],

  rules: {
    source_file: $ => repeat(
      seq($._sentence, '.')
    ),

    _sentence: $ => choice(
      $.typing_declaration,
      $.clause,
      $.fact,
      $.query
    ),

    typing_declaration: $ => seq(
      commaSep1($.const),
      '::',
      $._type
    ),

    clause: $ => seq(
      $._head,
      ':-',
      $.body
    ),

    fact: $ => $._head,

    query: $ => seq(
      '?-',
      $.body
    ),

    _head: $ => choice(
      $.const,
      seq($.const, field('parameters', $._parameters))
    ),

    body: $ => prec(1, choice(
      $.existential_body,
      commaSep1($._expression)
    )),

    existential_body: $ => existential($, $.body),

    _parameters: $ => choice(
      seq($._atom, repeat($._atom)),
      seq('(', commaSep1($._atom), ')')
    ),

    _expression: $ => choice(
      seq('(', $._expression, ')'),
      $.false,
      $.true,
      $._atom,
      $.application,
      $.lambda,
      $.or,
      $.and,
      $.not,
      $.eq,
      $.exists
    ),

    false: _ => 'false',
    true: _ => 'true',

    _atom: $ => choice($.const, $.var),

    _expression_i: $ => choice(
      $.const,
      $.var
    ),

    application: $ => prec(4, choice(
      seq($._expression, '(', commaSep1($._expression), ')'),
      prec.left(4, seq($._expression, $._expression))
    )),

    lambda: $ => seq(
      '\\',
      choice($.var, $.typed_var),
      '=>',
      $._expression
    ),

    or: $ => prec.left(1, seq($._expression, '\\/', $._expression)),

    and: $ => prec.left(2, seq($._expression, '/\\', $._expression)),

    not: $ => prec(3, seq(choice('~', 'not'), $._expression)),

    eq: $ => seq($._expression_i, '=', $._expression_i),

    exists: $ => existential($, $._expression), 

    typed_var: $ => choice(
      seq('(', $.typed_var, ')'),
      seq($.var, ':', $._type)
    ),

    _type: $ => choice(
      seq('(', $._type, ')'),
      $.type_i,
      $.type_o,
      $.type_arrow,
    ),

    type_i: _ => 'i',
    type_o: _ => 'o',
    type_arrow: $ => prec.right(seq($._type, '->', $._type)),

    const: _ => /[a-z][a-z0-9_]*'*/,

    var: _ => /[A-Z][A-Za-z0-9_]*'*/,

    comment: _ => token(
      seq('%', /.*/)
    )
  }
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

function existential(document, rule) {
  return seq(']', choice(document.var, document.typed_var), rule);
}
