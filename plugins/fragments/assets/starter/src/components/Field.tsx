import { useId, type InputHTMLAttributes } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

/** A labelled input. The label and the hint are tied to the input, so a screen reader says both. */
export function Field({ label, hint, id, className, ...rest }: FieldProps) {
  const made = useId(), input = id ?? made, hintId = hint ? `${input}-hint` : undefined;
  return (
    <div className={['st-field', className].filter(Boolean).join(' ')}>
      <label className="st-field-label" htmlFor={input}>{label}</label>
      <input className="st-field-input" id={input} aria-describedby={hintId} {...rest} />
      {hint ? <span className="st-field-hint" id={hintId}>{hint}</span> : null}
    </div>
  );
}
