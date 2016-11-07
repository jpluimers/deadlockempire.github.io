// language dependent things: try to abstract as much of language specifics here

var BinaryOperatorCode = function(left, right, operator, separator) {
    // TODO: find a better way than separator to split large expressions
    var separator;
    if (!separator) {
        separator = " "
    }
    return left + " " + operator + separator + right;
};

var keywordCode = function(keyword) {
    return spanTag("keyword", keyword);
};

var instructionCode = function(expression) {
    return expression + ";";
};

function snakeCaseToCamelCase(string){
    return string.replace(/\_\w/g, // convert underscore followed by word-characters through the function
        function(match) {
            return match.charAt(1).toUpperCase(); // match[0] is the underscore
        }
    );
}

var capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function snakeCaseToPascalCase(s) {
    return capitaliseFirstLetter(snakeCaseToCamelCase(s));
}

var ParenthesisedExpressionCode = function(expressionCode) {
    return "(" + expressionCode + ")";
};

var LanguageDependentIdentifierCapitalisation = function(identifier) {
    return snakeCaseToPascalCase(identifier); // Delphi
    return identifier; // C#
}

var LanguageDependentRefParameter = function(parameterName) {
    return LanguageDependentIdentifierCapitalisation(parameterName); // Delphi
    return keywordCode("ref") + " " + parameterName; // C#
}

var LanguageDependentIntegerDivisionOperator = function () {
    return keywordCode("div"); // Delphi
    return "/"; // C#
}

var LanguageDependentIntegerModulusOperator = function () {
    return keywordCode("mod"); // Delphi
    return "%"; // C#
}

var LanguageDependentAssignmentOperator = function () {
    return ":="; // Delphi
    return "="; // C#
}

var LanguageDependentBooleanAndOperator = function () {
    return keywordCode("and"); // Delphi
    return "&&"; // C#
}

var LanguageDependentBooleanOrOperator = function () {
    return keywordCode("or"); // Delphi
    return "||"; // C#
}

var LanguageDependentValueEqualityOperator = function () {
    return "="; // Delphi
    return "=="; // C#
}

var LanguageDependentValueInequalityOperator = function () {
    return keywordCode("<>"); // Delphi
    return "!="; // C#
}

var LanguageDependentClassName = function(className) {
    return "T" + LanguageDependentIdentifierCapitalisation(className); // Delphi
    return className; // C#
}

var LanguageDependentInterfaceName = function(className) {
    return "I" + LanguageDependentIdentifierCapitalisation(className); // C# or Delphi
}

var LanguageDependentConstruction = function(className) {
    // TODO refactor: for both using instanceMethodExpressionCode()
    return LanguageDependentClassName(className) + ".Create()"; // Delphi
    return keywordCode("new") + " " + className + "()"; // C#
}

var LanguageDependentBegin = function() {
    return keywordCode("begin"); // Delphi
    return "{"; // C#
}

var LanguageDependentDo = function() {
    return keywordCode("do"); // C# or Delphi
}

var LanguageDependentDoBegin = function() {
    return LanguageDependentDo() + " " + LanguageDependentBegin(); // Delphi or C#
}

var LanguageDependentDoBeginInWhileLoop = function() {
    return LanguageDependentDoBegin(); // Delphi
    return LanguageDependentDo(); // C#
}

var LanguageDependentElse = function() {
    return keywordCode("else"); // C# or Delphi
}
var LanguageDependentEnd = function() {
    return keywordCode("end"); // Delphi
    return "}"; // C#
}
var LanguageDependentEndInstruction = function() {
    return instructionCode(LanguageDependentEnd()); // Delphi needs a semicolon, C# has end-of-statement implicit
    return LanguageDependentEnd(); // C#
}

var LanguageDependentEndElseBegin = function() {
    return LanguageDependentEnd() + " " + LanguageDependentElse() + " " + LanguageDependentBegin(); // C# or Delphi
}

var LanguageDependentIf = function() {
    return keywordCode("if"); // C# or Delphi
}

var LanguageDependentIfWhileDoExpression = function(expressionCode) {
    var resultExpression = ParenthesisedExpressionCode(expressionCode); // C#
    var resultExpression = expressionCode; // Delphi
    return " " + resultExpression + " ";
};

var LanguageDependentIncrement = function(name) {
    var capitalisedName = LanguageDependentIdentifierCapitalisation(name);
    return instanceMethodExpressionCode("", "Inc", capitalisedName); // Delphi
    return capitalisedName + "++"; // C#
}

var LanguageDependentInterlockedIncrement = function(name) {
    var capitalised = LanguageDependentRefParameter(name);
    return instanceMethodExpressionCode("", "InterlockedIncrement", capitalised); // Delphi
    return staticMethodExpressionCode("Interlocked", "Increment", capitalised); // C#
}

var LanguageDependentThen = function() {
    return keywordCode("then"); // Delphi
}

var LanguageDependentThenBegin = function() {
    return LanguageDependentThen() + " " + LanguageDependentBegin(); // Delphi
    return LanguageDependentBegin(); // C#
}

var LanguageDependentWhile = function() {
    return keywordCode("while"); // C# or Delphi
}

var LanguageDependentLiteralExpression = function(value) {
    if ((value === false) || (value === true)) {
        var capitalised = LanguageDependentIdentifierCapitalisation(value.toString());
        return capitalised; // Delphi
        return keywordCode(capitalised); // C#
    } else {
        return value.toString();
    }
};

var LanguageDependentDebugInstanceName = function() {
    return ""; // Delphi
    return "Debug"; // C#
}

var LanguageDependentAndOperatorCode = function(left, right, separator) {
    // because of Delphi operator precedence: `and` has less precedence than comparison operators
    return BinaryOperatorCode(ParenthesisedExpressionCode(left), ParenthesisedExpressionCode(right), LanguageDependentBooleanAndOperator(), separator); // Delphi
    return BinaryOperatorCode(left, right, LanguageDependentBooleanAndOperator(), separator); // C#
};

var LanguageDependentSemaphoreSlimWaitMethodName = function() {
    return "WaitFor"; // Delphi
    return "Wait"; // C#
}

var LanguageDependentManualResetEventSlimResetMethodName = function() {
    return "ResetEvent"; // Delphi
    return "Reset"; // C#
}

var LanguageDependentManualResetEventSlimSetMethodName = function() {
    return "SetEvent"; // Delphi
    return "Set"; // C#
}

var LanguageDependentManualResetEventSlimWaitMethodName = function() {
    return "WaitFor"; // Delphi
    return "Wait"; // C#
}

var LanguageDependentCountdownEventWaitMethodName = function() {
    return "WaitFor"; // Delphi
    return "Wait"; // C#
}

var LanguageDependentSemaphoreSlimWaitMethodName = function() {
    return "WaitFor"; // Delphi
    return "Wait"; // C#
}

var LanguageDependentSignalAndWaitMethodName = function() {
    return "Wait"; // Delphi -> IThreadBarrier
    return "SignalAndWait"; // C#
}

var LanguageDependentMonitorWaitMethodName = function() {
    return "Wait"; // Delphi
    return "Wait"; // C#
}

var LanguageDependentMonitorClassName = function() {
    return "TMonitor"; // Delphi -> http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.Enter
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.Exit
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.Pulse
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.PulseAll
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.TryEnter
    // http://docwiki.embarcadero.com/Libraries/Berlin/en/System.TMonitor.Wait
    return "Monitor";
}
