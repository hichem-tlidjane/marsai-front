import { CiCircleInfo } from 'react-icons/ci';
import FormSectionTitle from './base/FormSectionTitle';
import FormSection from './base/FormSection';
import FormTextArea from './base/FormTextArea';
import { useTranslation } from 'react-i18next';
import FormErrors from './base/FormErrors';

function MovieSubmitDeclaration({ form }) {
  const { t } = useTranslation();
  const target = 'submitMovieForm.declaration.';
  const errors = 'submitMovieForm.formErrors.';

  return (
    <FormSection className="bg-primary text-zinc-200">
      <FormSectionTitle text={t(target + 'title')} />

      <div className="flex flex-col md:flex-row gap-2 border border-gray rounded-sm w-full p-3 my-4">
        <CiCircleInfo className="text-accent text-4xl" />
        <p>{t(target + 'paragraph')}</p>
      </div>

      <div className="flex flex-col w-full gap-3 pb-4">
        <p>{t(target + 'isHybrid.title')}</p>
        <div className="flex flex-row justify-around gap-3 w-full">
          <label
            className="flex items-center justify-center h-24 border border-gray rounded-sm cursor-pointer has-checked:bg-secondary has-checked:text-white has-checked:border-accent w-1/2 p-1 "
            htmlFor="form-full-ai"
          >
            {t(target + 'isHybrid.false.0')}
            <br />
            {t(target + 'isHybrid.false.1')}
            <input
              className=" appearance-none"
              type="radio"
              id="form-full-ai"
              name="ai-classification"
              value={false}
              {...form.register('isHybrid', {
                required: t(errors + 'requiredRadio'),
              })}
            ></input>
          </label>
          <label
            className="flex items-center justify-center h-24 border border-gray rounded-sm cursor-pointer has-checked:bg-secondary has-checked:text-white has-checked:border-accent w-1/2 p-1 "
            htmlFor="form-hybrid"
          >
            {t(target + 'isHybrid.true.0')}
            <br />
            {t(target + 'isHybrid.true.1')}
            <input
              className=" appearance-none"
              type="radio"
              id="form-hybrid"
              name="ai-classification"
              value={true}
              {...form.register('isHybrid', {
                required: t(errors + 'requiredRadio'),
              })}
            ></input>
          </label>
        </div>

        <FormErrors className="self-center" form={form} name="isHybrid" />
      </div>
      <div className="flex flex-col items-center md:flex-row w-full md:justify-between md:gap-20">
        <FormTextArea
          className=""
          label={t(target + 'aiTools.label')}
          maxCount={500}
          id="form-technical-stack"
          placeholder={t(target + 'aiTools.placeholder')}
          title={t(target + 'aiTools.title')}
          form={form}
          name="aiTools"
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 500,
              message: t(errors + 'maxLength500'),
            },
          }}
        />

        <FormTextArea
          className=""
          label={t(target + 'creativeProcess.label')}
          maxCount={500}
          id="form-creative-methodology"
          placeholder={t(target + 'creativeProcess.placeholder')}
          title={t(target + 'creativeProcess.title')}
          form={form}
          name="creativeProcess"
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 500,
              message: t(errors + 'maxLength500'),
            },
          }}
        />
      </div>
    </FormSection>
  );
}

export default MovieSubmitDeclaration;
