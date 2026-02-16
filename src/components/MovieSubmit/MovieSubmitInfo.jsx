import { useTranslation } from 'react-i18next';
import BasicFormInput from './base/BasicFormInput';
import FormSection from './base/FormSection';
import FormSectionTitle from './base/FormSectionTitle';
import FormTextArea from './base/FormTextArea';
import LanguagePicker from './base/LanguagePicker';

function MovieSubmitInfo({ form }) {
  const { t } = useTranslation();
  const target = 'submitMovieForm.info.';
  const errors = 'submitMovieForm.formErrors.';

  return (
    <FormSection className=" text-zinc-200">
      <FormSectionTitle text={t(target + 'title')} />

      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          label={t(target + 'originalTitle.label')}
          id="form-original-title"
          placeholder={t(target + 'originalTitle.title')}
          title={t(target + 'originalTitle.title')}
          form={form}
          name="originalTitle"
          autoFocus={true}
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 255,
              message: t(errors + 'maxLength255'),
            },
          }}
        />

        <BasicFormInput
          label={t(target + 'englishTitle.label')}
          id="form-english-translation"
          placeholder={t(target + 'englishTitle.title')}
          title={t(target + 'englishTitle.title')}
          form={form}
          name="englishTitle"
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 255,
              message: t(errors + 'maxLength255'),
            },
          }}
        />
      </div>

      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          label={t(target + 'duration.label')}
          id="form-duration"
          placeholder="ex: 60"
          title={t(target + 'duration.title')}
          form={form}
          name="duration"
          validation={{
            required: t(errors + 'required'),
            pattern: {
              value: /^[0-9]*$/,
              message: t(errors + 'digitsOnly'),
            },
            min: {
              value: 1,
              message: t(errors + 'minDuration'),
            },
            max: {
              value: 90,
              message: t(errors + 'maxDuration'),
            },
          }}
        />


        <LanguagePicker
          label={t(target + 'language.label')}
          id="form-language"
          title={t(target + 'language.title')}
          form={form}
          name="language"
          validation={{
            required: t(errors + 'required'),
          }}


        />
        {/* <BasicFormInput
          label={t(target + 'language.label')}
          id="form-language"
          placeholder={t(target + 'language.placeholder')}
          title={t(target + 'language.title')}
          form={form}
          name="language"
          validation={{
            required: t(errors + 'required'),
          }}
        /> */}
      </div>

      <div className="flex flex-col items-center w-full md:flex-row md:justify-between md:gap-20">
        <FormTextArea
          className=""
          label={t(target + 'originalSynopsis.label')}
          maxCount={300}
          id="form-original-synopsis"
          placeholder={t(target + 'originalSynopsis.placeholder')}
          title={t(target + 'originalSynopsis.title')}
          form={form}
          name="originalSynopsis"
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 300,
              message: t(errors + 'maxLength300'),
            },
          }}
        />

        <FormTextArea
          className=""
          label={t(target + 'englishSynopsis.label')}
          maxCount={300}
          id="form-english-synopsis"
          placeholder={t(target + 'englishSynopsis.placeholder')}
          title={t(target + 'englishSynopsis.title')}
          form={form}
          name="englishSynopsis"
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 300,
              message: t(errors + 'maxLength300'),
            },
          }}
        />
      </div>
    </FormSection>
  );
}

export default MovieSubmitInfo;
