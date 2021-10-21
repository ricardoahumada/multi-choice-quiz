import React, { Component, useState,useEffect } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

const shuffleArray=(array)=> {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

const THRESHOLDTOPASS=0.7;  

const App=()=>{
    const [questions, setQuestions]=useState(quizQuestions);
    const [answers, setAnswers]=useState({});
    const [showresult, setShowresult]=useState(false);    
    const [results, setResults]=useState({pass:false,errors:0,valid:0});  



    useEffect(() => {
      /*const questions=quizQuestions.map(aQ =>{
          aQ.answers=shuffleArray(aQ.answers);
          return aQ;
        });

      setQuestions(questions);*/
    },[]);


    const handleAnswerSelected=(event,idx)=> {
      const newanswers={...answers};
      const anAnswer=event.currentTarget.value;
      newanswers[idx]=anAnswer;
      // console.log('new answers:',newanswers);

      setAnswers(newanswers);
    }

    const renderQuiz=()=> {
      // console.log('new answers:',answers);
      
      return questions.map((aQ,idx)=><Quiz
            key={idx}
            answer={answers[idx]}
            answerOptions={aQ.answers}
            questionId={idx}
            question={aQ.question}
            questionTotal={questions.length}
            onAnswerSelected={(evnt)=>{handleAnswerSelected(evnt,idx)}}
          />);
    }

    const renderResult=()=> {
      const quizNumbers=`Has tenido ${results.valid} respuestas correctas y ${results.errors} errores.`;
      const valids=results.valid;

      let quizResult="";
      if(valids>=8){
        quizResult="¡Enhorabuena! Por tus resultados en el test, eres un experto en Planificación de Producto. Estás en disposición de comenzar tu aprendizaje sobre Gestión de la Release de Producto. ¡A por ello!";
      }else if(valids>=6){
        quizResult="¡Muy bien! Parece que tienes claros la mayoría de los conceptos de Planificación de Producto. Sin embargo, se ve que tienes algunas dudas con otros. Te recomendamos echar un vistazo a los contenidos del curso de Planificación de Producto, si es que lo has cursado con anterioridad, para comenzar esta nueva experiencia con una base más sólida. ¡A por ello!";
      }else{
        quizResult="Vaya, parece que tienes algunas dudas sobre conceptos básicos de Planificación de Producto. Te recomendemos que revises los contenidos de dicho curso, si es que lo has cursado con anterioridad, y que vuelvas a revisar el test después para comprobar que empiezas esta nueva aventura de aprendizaje con una base sólida. ¡A por ello! ";
      }

      return <Result quizResult={quizResult} quizNumbers={quizNumbers}/>;
    }


    const validateAnswers=()=>{ 
      const results=questions.reduce((acc, curr, idx)=>{
        const rightAnswer=curr.answers.find(aA=>aA.value>0);
        if(answers[idx] && answers[idx]==rightAnswer.type) acc.valid++;
        else acc.errors++;
        return acc;
      },{pass:false,errors:0,valid:0}); 

      if(results.valid>=THRESHOLDTOPASS*questions.length) results.pass=true;

      console.log('results:',results);

      setResults(results);
      setShowresult(true);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Product Release Management Readiness Test</h2>
        </header>
        <section className="questionsbody">
          {showresult ? renderResult() : renderQuiz()}
        </section>
        {!showresult ?<section className="botonera">
          <button onClick={()=>validateAnswers()}>Validar</button>
        </section>:null}

      </div>
    );;
}


export default App;
