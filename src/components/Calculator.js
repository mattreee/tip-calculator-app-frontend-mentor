import { useState } from "react";

const Calculator = () => {

  //one state for each input element
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  //these two variables will be rendered in the output
  let tipAmount = ((tip / 100) * bill) / people;
  let totalAmount = (bill / people) + tipAmount;

  //removes the 'active' class from all buttons, then adds it again to the button the user just clicked
  const buttons = document.querySelectorAll('[data-button-target]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(button => {
        button.classList.remove('active');
      })
      button.classList.add('active');
    })
  });

  function billHandle(e) {
    setBill(e.target.value);
  }

  function customHandle(e) {
    setTip(e.target.value);
  }

  function peopleHandle(e) {

    document.getElementById('not-zero').classList.remove('visible');

    if(e.target.value === '') {
      setPeople(1)
    } else if(e.target.value === '0') {
      document.getElementById('not-zero').classList.add('visible');
    } else {
      setPeople(e.target.value);
    }
  }

  function resetHandle() {
    setBill(0)
    document.getElementById('bill-input').value = '';

    setTip(15)
    document.getElementById('custom-input').value = '';

    setPeople(1)
    document.getElementById('people-input').value = '';

    buttons.forEach(button => {
      button.classList.remove('active');
    })
    document.getElementById('default-button').classList.add('active');
  }

  return (
    <div className='container'>
      <section className="container__inputs">

        <div className="container__bill">
          <p className='container__subtitle'>Bill</p>
          <input onChange={billHandle} className='container__input' type='number' id='bill-input' placeholder='0' />
        </div>
        <div className="container__tips">
          <p className='container__subtitle'>Select Tip %</p>
          <div className="container__buttons">
            <button onClick={() => setTip(5)} data-button-target className="container__tip">5%</button>
            <button onClick={() => setTip(10)} data-button-target className="container__tip">10%</button>
            <button onClick={() => setTip(15)} data-button-target id='default-button' className="container__tip active">15%</button>
            <button onClick={() => setTip(25)} data-button-target className="container__tip">25%</button>
            <button onClick={() => setTip(50)} data-button-target className="container__tip">50%</button>
            <input onChange={customHandle} type='number' className="container__custom" id='custom-input' placeholder='Custom'/>
          </div>
        </div>
        <div className="container__people">
          <div className="container__subs">
            <p className="container__subtitle">Number of People</p>
            <p className="danger-text" id="not-zero">Can't be zero</p>
          </div>
          <input onChange={peopleHandle} className='container__input' type="number" id="people-input" placeholder='1' />
        </div>
      </section>

      <section className="container__results">
        <div className='container__results__output'>
          <div>
            <p>Tip Amount</p>
            <p className="subtitle-subtitle">/ person</p>
          </div>
          <div>
            <p className="value-output" id='tip-output'>${tipAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className='container__results__output'>
          <div>
            <p>Total</p>
            <p className="subtitle-subtitle">/ person</p>
          </div>
          <div>
            <p className="value-output" id='total-output'>${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <button onClick={resetHandle} className="container__reset" id='reset-button'>Reset</button>
      </section>
    </div>
  )
}

export default Calculator
