var BooleanType = function() {
    this.name = "System.Boolean";
//    this.displayName = "bool"; // C#
    this.displayName = "Boolean"; // Delphi
    this.msdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = this.name;
};
var BooleanVariable = function (name, defaultValue) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new BooleanType();
    this.value = defaultValue;
};

var IntegerType = function() {
    this.name = "System.Int32";
//    this.displayName = "int"; // C#
    this.displayName = "Integer"; // Delphi
    this.msdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = "System.Integer";
};
var IntegerVariable = function (name, defaultValue) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new IntegerType();
    this.value = defaultValue;
};

var CountdownEventType = function() {
    this.name = "System.Threading.CountdownEvent";
    this.msdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = "System.SyncObjs.TCountdownEvent";
//    this.displayName = this.name; // C#
    this.displayName = this.docwikiRelativeUrl; // Delphi
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TCountdownEvent
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TCountdownEvent.Signal
    // Wait -> WaitFor http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TCountdownEvent.WaitFor
};
var CountdownEventVariable = function (name, count) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new CountdownEventType();
    this.value = count;
};

var ManualResetEventType = function() {
    this.name = "System.Threading.ManualResetEventSlim";
//    this.displayName = this.name; // C#
    this.msdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = "System.SyncObjs.TEvent";
    this.displayName = this.docwikiRelativeUrl; // Delphi
    // Delphi: use TEvent.Create as it will call another overload with ManualReset = true
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TEvent
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TEvent.Create
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TSynchroObject.Release
    // Set -> SetEvent http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TEvent.SetEvent
    // Wait -> WaitFor http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.THandleObject.WaitFor
};
var ManualResetEventVariable = function (name, value) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new ManualResetEventType();
    this.value = value;
};

var BarrierType = function() {
    this.name = "System.Threading.Barrier";
    this.msdnRelativeUrl = this.name;
//    this.displayName = this.name; // C#
    this.displayName = "ThreadBarrier.IThreadBarrier"; // Delphi
    // not available in Delphi RTL, but on https://github.com/lordcrc/ThreadBarrier/blob/master/ThreadBarrier.pas
    this.otherUrl = "https://github.com/lordcrc/ThreadBarrier/blob/master/ThreadBarrier.pas";
};
var BarrierVariable = function (name, participantCount) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new BarrierType();
    this.value = participantCount;
    this.numberOfParticipants = participantCount;
    this.hasArrived = [];
    this.phase = 0;
};

var SemaphoreType = function() {
    this.name = "System.Threading.SemaphoreSlim";
    this.msdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = "System.SyncObjs.TSemaphore";
//    this.displayName = this.name; // C#
    this.displayName = this.docwikiRelativeUrl; // Delphi
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TSemaphore
    // Wait -> WaitFor http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.THandleObject.WaitFor
    // http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TSemaphore.Release
    // Delphi initialise as Semaphore := TSemaphore.Create(nil, 0, 1, ''); so it will wait on the first Semaphore.WaitFor call
    // alternative (does it do spinlock?)
    // - http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TLightweightSemaphore
    // - http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TLightweightSemaphore.WaitFor
    // - http://docwiki.embarcadero.com/Libraries/en/System.SyncObjs.TLightweightSemaphore.Release
};
var SemaphoreVariable = function(name, value) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new SemaphoreType();
    this.value = value;
};

var QueueType = function(innerType) {
    this.msdnRelativeUrl = "7977ey2c";
    this.docwikiRelativeUrl = "System.Generics.Collections.TQueue";
    this.name = "System.Collections.Generic.Queue" + "<" + innerType.name + ">";
//    this.displayName = "System.Collections.Generic.Queue" + "<" + innerType.displayName + ">"; // C#
    this.displayName = this.docwikiRelativeUrl + "<" + innerType.displayName + ">"; // Delphi
};
var QueueVariable = function(name, innerType, value) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new QueueType(innerType);
    this.value = value;
};

var ObjectType = function(name) {
    this.name = "System.Object";
    this.msdnmsdnRelativeUrl = this.name;
    this.docwikiRelativeUrl = "http://docwiki.embarcadero.com/Libraries/en/System.TObject";
    if (name != null) {
        this.name = name;
        this.displayName = LanguageDependentClassName(name); // C#
    } else {
        this.displayName = "TObject"; // Delphi
    }
}
var ObjectVariable = function(name) {
    this.name = name;
    this.displayName = LanguageDependentIdentifierCapitalisation(name);
    this.type = new ObjectType();
};

/**
 * Returns the variable value in human-readable form.
 * @param variable A variable.
 * @returns string Its value in human form.
 */
var ToString = function(variable) {
    var typeName = variable.type.name;
    var value = variable.value;
    switch (typeName) {
        case "System.Threading.CountdownEvent":
            return value == 0 ? "[event set]" : (value == 1 ? "[waits for one more signal]" : "[waits for " + value + " more signals]");
        case "System.Threading.ManualResetEventSlim":
            return "[" + (value ? "signaled" : "nonsignaled" ) + "]";
        case "System.Threading.Barrier":
            return "[phase " + variable.phase + ", waiting for " + value + " threads]";
        case "System.Object":
            return "";
        case "System.Threading.SemaphoreSlim":
            return "[counter: " + value + "]";

    }
    if (typeName.indexOf("System.Collections.Generic.Queue") == 0) {
        return "[number of enqueued items: " + value + "]";
    }
    return null;
};
