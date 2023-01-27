import {useState, useEffect} from "react"
import './styles.css'
import RenderHistory from "./renderHistory";

let numberToggle = true;
let equals = false

const LOCAL_STORAGE_KEY = 'calculator'

function App() {

    const [number1, setNumber1] = useState([]);
    const [number2, setNumber2] = useState([]);
    const [operation, setOperation] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [calcHistory, setCalcHistory] = useState([])


    // return the history from local storage
    useEffect(() => {
        const calcHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        console.log(calcHistory);
        if (calcHistory.length > 0) {
            setCalcHistory(calcHistory)
        }
    }, []);

    // put the history into the local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calcHistory));
    }, [calcHistory]);

    // put the history into the local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calcHistory));
    }, [calcHistory]);

    const handleClearHistory = () => {
        setCalcHistory([])
    }

    const renderHistory = () => {
        if (calcHistory.length > 0) {
            return (
                <div className='calc-history-container'>
                    <div className='calc-history'>
                        <h2>Calculation History</h2>
                        <RenderHistory calcHistory={calcHistory}/>

                    </div>
                    <button className='clear-hist-button' onClick={handleClearHistory}>Clear History</button>
                </div>
            )
        }
    }


    const clearOperation = () => {
        setNumber1([])
        setNumber2([])
        setOperation(null)
        setAnswer(null)
        equals = false;
        numberToggle = true;
    }


    const handleNumberClick = (value) => {
        if (equals) {
            clearOperation()
        }
        equals = false;
        if (numberToggle) {
            setNumber1(prevValue => [...prevValue, value].join(''))
        } else {
            setNumber2(prevValue => [...prevValue, value].join(''))
        }

    }

    const handleOperationClick = (operation) => {
        let answerHolder = null;


        if (operation === 'clear') {
            clearOperation()
            return;
        } else if (number1.length !== 0 && number2.length !== 0) {
            answerHolder = handleCalculation()
            clearOperation()
            setNumber1([answerHolder])
            numberToggle = false;

        } else if (number1.length !== 0 && number2.length === 0) {
            numberToggle = false;
        } else {
            numberToggle = !numberToggle
        }
        equals = false;
        setOperation(operation)
    }

    const handleCalculation = () => {
        let num1 = Number(number1);
        let num2 = Number(number2);
        numberToggle = !numberToggle
        equals = !equals;
        let ans = null;

        switch (operation) {
            case null:
                alert('Not enough input arguments')
                return;
            case '+':
                ans = num1 + num2;
                break;
            case '-':
                ans = num1 - num2;
                break;
            case 'x':
                ans = num1 * num2;
                break
            case '/':
                ans = num1 / num2;
                break
        }
        setAnswer(ans);
        setCalcHistory(prevState => [...prevState, {number1: num1, number2: num2, operation: operation, answer: ans}])
        return ans;

    }
    return (
        <div className="App">
            <div>
                <h1> Basic Calculator</h1>
                <div className='calculator-grid'>

                    <div className='output'>{number1} {operation} {number2} {equals ? '=' : ''} {answer}</div>

                    <button onClick={() => handleNumberClick(1)}>1</button>
                    <button onClick={() => handleNumberClick(2)}>2</button>
                    <button onClick={() => handleNumberClick(3)}>3</button>
                    <button onClick={() => handleOperationClick('+')}>+</button>


                    <button onClick={() => handleNumberClick(4)}>4</button>
                    <button onClick={() => handleNumberClick(5)}>5</button>
                    <button onClick={() => handleNumberClick(6)}>6</button>
                    <button onClick={() => handleOperationClick('-')}> -</button>


                    <button onClick={() => handleNumberClick(7)}>7</button>
                    <button onClick={() => handleNumberClick(8)}>8</button>
                    <button onClick={() => handleNumberClick(9)}>9</button>
                    <button onClick={() => handleOperationClick('x')}> x</button>


                    <button> &nbsp;</button>
                    <button onClick={() => handleNumberClick('.')}> .</button>
                    <button onClick={() => handleNumberClick(0)}>0</button>
                    <button onClick={() => handleOperationClick('/')}> /</button>

                    <button className='span-two' onClick={() => handleOperationClick('clear')}>Clear</button>
                    <button className='span-two' onClick={handleCalculation}>=</button>


                {renderHistory()}
                </div>
            </div>
        </div>

    );
}

export default App;
