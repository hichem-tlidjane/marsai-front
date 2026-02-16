import { useState } from 'react';
import FormErrors from './FormErrors';

function FormTextArea({
  label,
  maxCount,
  id,
  placeholder,
  title,
  form,
  validation,
  name,
  className = '',
}) {
  if (!validation) {
    validation = { required: false };
  }

  const [count, setCount] = useState(0);
  const { onChange: onFormChange, ref } = form.register(name, validation);

  function countCharacters(event) {
    onFormChange(event);
    setCount(event?.target.value.length);
  }

  className = 'flex flex-col w-full gap-2 md:pb-0 pb-3' + ' ' + className;

  return (
    <div className={className}>
      <div className="flex justify-between">
        <label htmlFor={id}>{label}</label>
        <p className={count > maxCount ? 'text-red-600' : ''}>
          {count} / {maxCount}
        </p>
      </div>
      <textarea
        className="outline-2 outline-neutral-400 rounded-sm p-3 h-36 md:h-44 border-0 focus:outline-neutral-100"
        id={id}
        type="textarea"
        placeholder={placeholder}
        title={title}
        name={name}
        ref={ref}
        onChange={countCharacters}
      ></textarea>

      <FormErrors form={form} name={name} />
    </div>
  );
}

export default FormTextArea;
