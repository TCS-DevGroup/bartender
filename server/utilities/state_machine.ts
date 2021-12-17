
/**
 * Abstrac state machine class
 */

enum State 
{
    Idle,
    CleanUp,
}

abstract class StateMachine 
{
    constructor( ) 
    {
        this.m_currentState = 0;
        this.m_nextState = 0;
        this.m_previousState = 0;
    }

    protected SetNextState ( nextState : State )
    {
        switch ( nextState )
        {
            case State.Idle     : this.m_currentState = State.Idle;
            case State.CleanUp  : this.m_currentState = State.CleanUp;
        }
    }

    protected GetNextState ( ) : State
    {
        return this.m_nextState;
    }

    protected GetPreviousState ( ) : State
    {
        return this.m_previousState;
    }
    
    protected GetCurrentState ( ) : State
    {
        return this.m_currentState;
    }

    private m_currentState  : State;
    private m_previousState : State;
    private m_nextState     : State;
}