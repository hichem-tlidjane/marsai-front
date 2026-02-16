import FormErrors from "./FormErrors";
import languages from "../../../data/languages";

function LanguagePicker({
    label,
    title,
    id,
    name,
    form,
    validation = false,
    className = '',
}) {
    if (!validation) {
        validation = { required: false };
    }

    className = 'flex flex-col md:w-full gap-2 md:pb-4 pb-3' + ' ' + className;
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <select
                className="w-full justify-center bg-secondary px-2 pt-2 pb-1.5 rounded-md border border-zinc-200"
                name={name}
                id={id}
                title={title}
                {...form.register(name, validation)} >
                {
                    languages.map((e, index) => (
                        <option className="" key={index} value={e.lang}>
                            {e.icon} &nbsp;&nbsp;&nbsp; {e.text}
                        </option>
                    ))
                }
            </select>
            <FormErrors form={form} name={name} />
        </div>
    );
}

export default LanguagePicker;