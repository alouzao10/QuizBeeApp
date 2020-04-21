import React, { useState } from 'react';

function QuestionBox({ question, options, selected }) {
	const [ answer, setAnswer ] = useState(options);

	const pickAnswer = (e) => {
		setAnswer([ e.target.innerText ]);
		selected(e.target.innerText);
	};

	return (
		<div className='questionBox'>
			<div className='question'>{question}</div>
			{answer.map((text, index) => (
				<button key={index} className='answerBtn' onClick={pickAnswer}>
					{text}
				</button>
			))}
		</div>
	);
}

export default QuestionBox;
