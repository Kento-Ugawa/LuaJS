{
  const {
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
  } = require("./helper");

  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

start 
  = body:line* { return emitProgram(body); }

line 
  = call
  / statement

call
  = print

statement
  = if
  / for

print 
  = "print" "(" str:string ")" { return emitPrint(str); }

if
  = "if" sp exp:expression sp "then" sp+ body:block alt:else sp+ "end" { return emitIf(exp, body, alt); }

else
  = sp+ "elseif" sp exp:expression sp "then" sp+ body:block alt:else { return emitIf(exp, body, alt); }
  / sp+ "else" sp+ body:block { return body }
  / "" { return null; }

for
  = "for" sp start:assignmentExpression "," sp stop:comparisonExpression "," sp step:assignmentExpression sp "do" sp+ body:block sp+ "end" { return emitFor(start, stop, step, body); }

expression
  = comparisonExpression
  / arithmeticExpression
  / assignmentExpression

comparisonExpression
  = left:arithmeticExpression sp operator:comparisonOperator sp right:integer { return emitComparisonExp(left, operator, right); }
  / right:integer { return emitForComparisonExp(right); }

arithmeticExpression
  = left:string sp operator:arithmeticOperator sp right:integer { return emitArithmeticExp(left, operator, right); }
  / left:integer sp operator:arithmeticOperator sp right:integer { return emitArithmeticExp(left, operator, right); }

assignmentExpression
  = char:character sp "=" sp int:integer { return emitAssignmentExp(char, int); }
  / right:integer { return emitForAssignmentExp(right); }

block = body:line+ { return emitBlockStm(body); }

string 
  = sq char:$strCharacter+ sq { return { type: "Literal", value: char, raw: `'${char}'` }; }
  / char:$character+ { return { type: "Identifier", name: char }; }

strCharacter 
  = [a-zA-Z0-9$=#^~\|!@ ;:_?/>.<,]

character
  = [a-zA-Z_]

integer
  = digits:[0-9]+ { return emitLiteral(makeInteger(digits)); }

comparisonOperator 
  = "==" { return "==="; }
  / ">=" { return ">="; }
  / "<=" { return "<="; }
  / ">" { return ">"; }
  / "<" { return "<"; }

arithmeticOperator
  = "%" { return "%"; }
  / "+" { return "+"; }
  / "-" { return "-"; }
  / "/" { return "/"; }
  / "*" { return "*"; }

sq 
  = "'"

sp 
  = " "
  / "\t"
  / "\n" 
  / "\r"
  / "\r\n"