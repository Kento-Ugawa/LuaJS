'use strict';

function flattenDeep(arr) {
  return arr.reduce((acc, val) => [...acc, ...(Array.isArray(val) ? flattenDeep(val) : [val])], []);
}

function emitProgram(body) {
  const flatten = flattenDeep(body);
  return {
    "type": "Program",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "Literal",
          "value": "use strict",
          "raw": "'use strict'"
        },
        "directive": "use strict"
      },
      ...flatten
    ],
    "sourceType": "script",
  };
}

function emitPrint(str) {
  return {
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "Identifier",
          "name": "console"
        },
        "property": {
          "type": "Identifier",
          "name": "log"
        }
      },
      "arguments": [str]
    }
  };
}

function emitIf(exp, body, alt) {
  return {
    "type": "IfStatement",
    "test": exp,
    "consequent": body,
    "alternate": alt ? alt : null
  };
}

function emitFor(start, stop, step, body) {
  return {
    "type": "ForStatement",
    "init": start,
    "test": stop,
    "update": step,
    "body": body
  };
}

function emitComparisonExp(left, operator, right) {
  return {
    "type": "BinaryExpression",
    "operator": operator,
    "left": left,
    "right": right
  };
}

function emitForComparisonExp(right) {
  return {
    "type": "BinaryExpression",
    "operator": "<=",
    "left": {
      "type": "Identifier",
      "name": "i"
    },
    "right": right
  };
}

function emitArithmeticExp(left, operator, right) {
  return {
    "type": "BinaryExpression",
    "operator": operator,
    "left": left,
    "right": right
  };
}

function emitAssignmentExp(char, int) {
  return {
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": char
        },
        "init": int
      }
    ],
    "kind": "let"
  };
}

function emitForAssignmentExp(right) {
  return {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
      "type": "Identifier",
      "name": "i"
    },
    "right": {
      "type": "BinaryExpression",
      "operator": "+",
      "left": {
        "type": "Identifier",
        "name": "i"
      },
      "right": right
    }
  };
}

function emitBlockStm(body) {
  return {
    "type": "BlockStatement",
    "body": body
  }
}

function emitLiteral(num) {
  return {
    "type": "Literal",
    "value": num,
    "raw": num.toString()
  };
}

module.exports = {
  emitProgram,
  emitPrint,
  emitIf,
  emitFor,
  emitComparisonExp,
  emitForComparisonExp,
  emitArithmeticExp,
  emitAssignmentExp,
  emitForAssignmentExp,
  emitBlockStm,
  emitLiteral,
}