import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';

import quizService from './quizService/index';

import QuestionBox from './Components/QuestionBox';
import Results from './Components/Results';

class QuizBee extends Component {
	// State is located at the nearest parent
	// to then be used by nested child components
	state = {
		questions: [],
		score: 0,
		responses: 0
	};

	getQuestions = () => {
		quizService().then((questions) => {
			this.setState({ questions });
		});
	};

	checkAnswer = (answer, correct) => {
		if (answer === correct) {
			this.setState({ score: this.state.score + 1 });
		}
		this.setState({ responses: this.state.responses < 5 ? this.state.responses + 1 : 5 });
	};

	playAgain = () => {
		this.getQuestions();
		this.setState({
			score: 0,
			responses: 0
		});
	};

	// Function is called on the initial load of the component
	// Bring in any initial data needed...
	componentDidMount() {
		this.getQuestions();
	}

	render() {
		return (
			<div className='container'>
				<div className='title'>QuizBee</div>
				{this.state.questions.length > 0 &&
					this.state.responses < 5 &&
					this.state.questions.map(({ question, answers, correct, questionId }) => (
						<QuestionBox
							question={question}
							options={answers}
							key={questionId}
							selected={(answer) => this.checkAnswer(answer, correct)}
						/>
					))}
				{this.state.responses === 5 ? <Results score={this.state.score} playAgain={this.playAgain} /> : null}
			</div>
		);
	}
}

// How we initially load in the parent component into root
ReactDOM.render(<QuizBee />, document.getElementById('root'));
