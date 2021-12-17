"use strict";
/**
 * $Rev: 13421 $
 * $LastChangedDate: 2020-11-06 10:58:55 +0100 (fr, 06 nov 2020) $
 * $Author: tgj $
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = exports.StateMachineLogSeverity = void 0;
var StateMachineLogSeverity;
(function (StateMachineLogSeverity) {
    StateMachineLogSeverity[StateMachineLogSeverity["Critical"] = 0] = "Critical";
    StateMachineLogSeverity[StateMachineLogSeverity["Error"] = 1] = "Error";
    StateMachineLogSeverity[StateMachineLogSeverity["Warning"] = 2] = "Warning";
    StateMachineLogSeverity[StateMachineLogSeverity["Information"] = 3] = "Information";
    StateMachineLogSeverity[StateMachineLogSeverity["Trace"] = 4] = "Trace";
})(StateMachineLogSeverity = exports.StateMachineLogSeverity || (exports.StateMachineLogSeverity = {}));
;
var StateMachine = /** @class */ (function () {
    function StateMachine(name) {
        this.m_name = name;
        this.m_stateChanged = true;
        this.m_stateChangeCallback = undefined;
        this.m_currentState = 0;
        this.m_nextState = 0;
        this.m_command = 0;
        this.m_tickCountWhenStateEntered_ms = 0;
        this.m_tickCountAtLastEvery_ms = 0;
        //this.m_profilingTimeStarted_10us = 0;
        //this.m_lastProfiledTime_10us = 0;
        //this.m_maxProfiledTime_10us = 0;
        //this.m_sumProfiledTime_10us = 0;
        //this.m_profilings = 0;
        //this.m_stateAtMaxProfiling = 0;
        this.m_logger_Func = undefined;
        this.m_Alarm_Func = undefined;
        this.m_tag = 0;
        this.m_stateChanged = true;
        this.m_doOnceCalled = false;
        this.m_doEveryCalled = false;
        this.m_inEveryStateCalled = false;
        this.m_logStateChanged = true;
        //this.m_next_statemachine = 0;
        this.m_isServning = false;
    }
    //static StateMachine            *m_first_statemachine;			//!< Pointer to first state machine in chain.
    //StateMachine                   *m_next_statemachine;			//!< Pointer to next state machine in chain.
    StateMachine.GetTimerTick = function () {
        var ns_big = process.hrtime.bigint();
        var ns = Number(ns_big);
        var ms = ns / 1000000;
        return ms;
    };
    StateMachine.prototype.SetTag = function (tag) {
        this.m_tag = tag;
    };
    StateMachine.prototype.GetTag = function () {
        return this.m_tag;
    };
    StateMachine.prototype.Log = function (severity, code, text) {
        if (this.m_logger_Func)
            this.m_logger_Func(this, severity, code, text);
    };
    StateMachine.prototype.LogInfo = function (text) {
        this.Log(StateMachineLogSeverity.Information, 0, text);
    };
    StateMachine.prototype.LogError = function (text) {
        this.Log(StateMachineLogSeverity.Error, 0, text);
    };
    StateMachine.prototype.InEveryState = function () { };
    StateMachine.prototype.GetName = function () {
        return this.m_name;
    };
    StateMachine.prototype.GetStateName = function (state) {
        return "" + state;
    };
    StateMachine.prototype.GetCleanupStateName = function (state) {
        return "" + state;
    };
    StateMachine.prototype.InternalGetStateName = function (state) {
        if (state < 0)
            return this.GetCleanupStateName(state);
        else
            return this.GetStateName(state);
    };
    StateMachine.prototype.SetNextState = function (new_state) {
        if (!this.m_isServning) {
            // SetNextState is only allowed to be called when the state machine
            // is being serviced. Otherwise the OnExit is not executed for the
            // current state.
            this.LogError("Illegal call of SetNextState");
        }
        if (new_state != this.m_currentState) {
            this.m_nextState = new_state;
        }
    };
    StateMachine.prototype.IsOnEntry = function () {
        if (this.m_stateChanged) {
            this.m_stateChanged = false;
            return true;
        }
        return false;
    };
    StateMachine.prototype.IsOnExit = function () {
        this.InEveryState();
        this.m_inEveryStateCalled = true;
        if (this.m_nextState != this.GetCurrentState())
            return true;
        else
            return false;
    };
    StateMachine.prototype.TimeSinceStateStarted_ms = function () {
        return StateMachine.GetTimerTick() - this.m_tickCountWhenStateEntered_ms;
    };
    StateMachine.prototype.DoOnceAfter_ms = function (time_ms) {
        if (!this.m_doOnceCalled) {
            if (this.TimeSinceStateStarted_ms() >= time_ms) {
                this.m_doOnceCalled = true;
                return true;
            }
        }
        return false;
    };
    StateMachine.prototype.DoEvery_ms = function (time_ms, accumulated) {
        if (accumulated === void 0) { accumulated = false; }
        var tick = StateMachine.GetTimerTick();
        if (tick - this.m_tickCountAtLastEvery_ms >= time_ms) {
            if (accumulated) {
                this.m_tickCountAtLastEvery_ms += time_ms;
            }
            else {
                this.m_tickCountAtLastEvery_ms = tick;
            }
            return true;
        }
        return false;
    };
    StateMachine.prototype.Serve = function () {
        //StartProfiling ( );
        this.m_isServning = true;
        if (this.m_stateChanged) {
            // This is the first time we are serving a new state
            var tick = StateMachine.GetTimerTick();
            var time_in_state_ms = tick - this.m_tickCountWhenStateEntered_ms;
            //m_StateTrace.PutState(m_currentState, (uint16_t)time_in_state_ms / 10 );
            if (this.m_logStateChanged) {
                console.log("\"" + this.m_name + "\": Old state <" + this.InternalGetStateName(this.m_currentState) + "> ==> New state <" + this.InternalGetStateName(this.m_nextState) + ">");
            }
            this.m_currentState = this.m_nextState;
            this.m_doOnceCalled = false;
            this.m_tickCountWhenStateEntered_ms = tick;
            this.m_tickCountAtLastEvery_ms = tick;
            if (this.m_logStateChanged) {
                var statename = this.InternalGetStateName(this.GetCurrentState());
                this.LogInfo("State=>" + statename);
            }
            if (this.m_stateChangeCallback)
                this.m_stateChangeCallback(this, this.GetCurrentState());
        }
        this.m_inEveryStateCalled = false;
        if (this.GetCurrentState() < 0)
            this.ServeCleanupState(this.GetCurrentState());
        else
            this.ServeState(this.GetCurrentState());
        if (!this.m_inEveryStateCalled) {
            this.InEveryState();
            this.m_inEveryStateCalled = true;
        }
        this.m_stateChanged = false;
        if (this.m_nextState != this.GetCurrentState()) // Do we want to change to a new state
         {
            this.m_stateChanged = true;
            this.m_command = 0; // Clear command so only new requests are handled after state change.
        }
        this.m_isServning = false;
        //StopProfiling ( );
    };
    StateMachine.prototype.GetCurrentState = function () {
        return this.m_currentState;
    };
    StateMachine.prototype.GetNextState = function () {
        return this.m_nextState;
    };
    StateMachine.prototype.IsInStateChange = function () {
        return this.m_stateChanged;
    };
    StateMachine.prototype.SetStateChangeCallback = function (callback) {
        this.m_stateChangeCallback = callback;
    };
    StateMachine.prototype.SetLogger = function (logger) {
        this.m_logger_Func = logger;
    };
    StateMachine.prototype.SetAlarmFunc = function (alarm_func) {
        this.m_Alarm_Func = alarm_func;
    };
    StateMachine.prototype.SetCommand = function (command) {
        this.m_command = command;
    };
    StateMachine.prototype.GetAndClearCommand = function () {
        var cmd = this.m_command;
        this.m_command = 0;
        return cmd;
    };
    StateMachine.prototype.PeekCommand = function () {
        return this.m_command;
    };
    StateMachine.prototype.GenerateAlarm = function (alarmNo, setAlarm) {
        if (this.m_Alarm_Func) {
            this.m_Alarm_Func(alarmNo, setAlarm);
        }
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
