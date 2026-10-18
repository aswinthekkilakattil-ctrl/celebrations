import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const prefix = useId();
  return (
    <div className="faq-list">
      {items.map(({ question, answer }, index) => (
        <div className={`faq-item ${open === index ? 'faq-item--open' : ''}`} key={question} data-reveal="up">
          <h3><button id={`${prefix}-question-${index}`} aria-expanded={open === index}
            aria-controls={`${prefix}-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="faq-number">0{index + 1}</span><span>{question}</span><Plus size={18} aria-hidden="true" />
          </button></h3>
          <div id={`${prefix}-answer-${index}`} className="faq-answer" role="region"
            aria-labelledby={`${prefix}-question-${index}`} inert={open !== index} aria-hidden={open !== index}>
            <div><div className="faq-answer-copy">{answer}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}
