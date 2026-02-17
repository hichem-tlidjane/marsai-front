import { useFieldArray } from 'react-hook-form';
import BasicFormInput from './base/BasicFormInput';
import FormNewCollaborator from './base/FormNewCollaborator';
import FormSection from './base/FormSection';
import FormSectionTitle from './base/FormSectionTitle';
import { useTranslation } from 'react-i18next';
import FormErrors from './base/FormErrors';

function MovieSubmitTeamComposition({ form }) {
  const { t } = useTranslation();
  const target = 'submitMovieForm.teamComposition.';
  const errors = 'submitMovieForm.formErrors.';

  const { fields, append, remove } = useFieldArray({
    name: 'collaborators',
    control: form.control,
  });

  function addCollaborator() {
    append({
      gender: 'mr',
      firstname: '',
      lastname: '',
      email: '',
      contribution: '',
    });
    console.log(fields);
  }
  return (
    <FormSection className="bg-primary text-zinc-200">
      <FormSectionTitle text={t(target + 'title')} />
      <p className="pt-2 pb-3 self-center text-2xl">
        {t(target + 'director.header')}
      </p>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <div className="flex flex-col md:flex-row md:w-full md:gap-x-5 md:pb-2">
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="form-director-gender">
              {t(target + 'director.gender.label')}
            </label>
            <select
              className="w-fit justify-center bg-primary px-2  pt-2 pb-1.5 rounded-md border border-zinc-200"
              id="form-director-gender"
              {...form.register('director.gender')}
            >
              <option value="mr">{t(target + 'director.gender.mr')}</option>
              <option value="mme">{t(target + 'director.gender.mrs')}</option>
              <option value="mx">{t(target + 'director.gender.mx')}</option>
            </select>
          </div>
          <div className="flex flex-col md:w-full">
            <label htmlFor="form-director-firstname">
              {t(target + 'director.firstname.label')}
            </label>
            <input
              className="outline-2 outline-neutral-400 rounded-sm pl-2 py-1 my-2 min-w-full border-0 focus:outline-neutral-100"
              id="form-director-firstname"
              type="text"
              {...form.register('director.firstname', {
                required: t(errors + 'required'),
                minLength: {
                  value: 3,
                  message: t(errors + 'minLength3'),
                },
                maxLength: {
                  value: 100,
                  message: t(errors + 'maxLength100'),
                },
              })}
              placeholder={t(target + 'director.firstname.placeholder')}
              title={t(target + 'director.firstname.title')}
            ></input>

            <FormErrors form={form} name="director.firstname" />
          </div>
        </div>

        <div className="flex flex-col md:w-full">
          <label htmlFor="form-director-lastname">
            {t(target + 'director.lastname.label')}
          </label>
          <input
            className="outline-2 outline-neutral-400 rounded-sm pl-2 py-1 my-2 min-w-full border-0 focus:outline-neutral-100"
            id="form-director-lastname"
            type="text"
            {...form.register('director.lastname', {
              required: t(errors + 'required'),
              minLength: {
                value: 3,
                message: t(errors + 'minLength3'),
              },
              maxLength: {
                value: 100,
                message: t(errors + 'maxLength100'),
              },
            })}
            placeholder={t(target + 'director.lastname.placeholder')}
            title={t(target + 'director.lastname.title')}
          ></input>
          <FormErrors form={form} name="director.lastname" />
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          label={t(target + 'director.job.label')}
          id="director-job"
          name="director.job"
          placeholder=""
          title={t(target + 'director.job.title')}
          form={form}
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 100,
              message: t(errors + 'maxLength100'),
            },
          }}
        />

        <BasicFormInput
          label={t(target + 'director.birthdate.label')}
          type="date"
          id="director-birthdate"
          name="director.birthdate"
          placeholder=""
          title={t(target + 'director.birthdate.title')}
          form={form}
          validation={{
            required: t(errors + 'required'),
            validate: value => {
              let now = Date.now();
              value = Date.parse(value);
              let age = new Date(now - value).getFullYear() - 1970;
              if (age < 18) {
                return t(errors + 'mustBeAdult');
              }
              return true;
            },
          }}
        />
      </div>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          label={t(target + 'director.email.label')}
          id="director-email"
          name="director.email"
          placeholder={t(target + 'director.email.placeholder')}
          title={t(target + 'director.email.title')}
          form={form}
          validation={{
            required: t(errors + 'required'),
            pattern: {
              value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              message: t(errors + 'validEmail'),
            },
            minLength: {
              value: 5,
              message: t(errors + 'minLength5'),
            },
            maxLength: {
              value: 100,
              message: t(errors + 'maxLength100'),
            },
          }}
        />

        <BasicFormInput
          label={t(target + 'director.phone.label')}
          id="director-phone"
          name="director.phone"
          placeholder={t(target + 'director.phone.placeholder')}
          title={t(target + 'director.phone.title')}
          form={form}
          validation={{
            required: t(errors + 'required'),
            pattern: {
              value: /^[+]?[0-9]*$/,
              message: t(errors + 'validPhone'),
            },
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 50,
              message: t(errors + 'maxLength50'),
            },
          }}
        />
      </div>
      <div className="w-full pb-2">
        <label htmlFor="form-director-address">
          {t(target + 'director.address.label')}
        </label>
        <input
          className="outline-2 outline-neutral-400 rounded-sm border-0 focus:outline-neutral-100 min-w-full pl-2 py-1 my-2"
          id="form-director-address"
          {...form.register('director.address', {
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 255,
              message: t(errors + 'maxLength255'),
            },
          })}
          placeholder=""
          title={t(target + 'director.address.title')}
        ></input>

        <FormErrors form={form} name="director.address" />
      </div>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          form={form}
          label={t(target + 'director.city.label')}
          id="director-city"
          name="director.city"
          placeholder=""
          title={t(target + 'director.city.title')}
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 100,
              message: t(errors + 'maxLength100'),
            },
          }}
        />

        <BasicFormInput
          form={form}
          label={t(target + 'director.zipcode.label')}
          id="director-zipcode"
          name="director.zipcode"
          placeholder=""
          title={t(target + 'director.zipcode.title')}
          validation={{
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 20,
              message: t(errors + 'maxLength20'),
            },
          }}
        />
      </div>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          form={form}
          label={t(target + 'director.region.label')}
          id="director-region"
          name="director.region"
          placeholder=""
          title={t(target + 'director.region.title')}
          validation={{
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 100,
              message: t(errors + 'maxLength100'),
            },
          }}
        />

        <BasicFormInput
          form={form}
          label={t(target + 'director.country.label')}
          id="director-country"
          name="director.country"
          placeholder=""
          title={t(target + 'director.country.title')}
          validation={{
            required: t(errors + 'required'),
            minLength: {
              value: 3,
              message: t(errors + 'minLength3'),
            },
            maxLength: {
              value: 100,
              message: t(errors + 'maxLength100'),
            },
          }}
        />
      </div>
      <p className="pt-4 pb-3 self-center text-2xl">
        {t(target + 'director.socials')}
      </p>
      <div className="flex flex-col w-full md:flex-row md:justify-between md:gap-20">
        <BasicFormInput
          form={form}
          label={t(target + 'director.facebook.label')}
          id="director-facebook"
          name="director.facebook"
          placeholder=""
          title={t(target + 'director.facebook.title')}
          validation={{
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
          form={form}
          label={t(target + 'director.instagram.label')}
          id="director-instagram"
          name="director.instagram"
          placeholder=""
          title={t(target + 'director.instagram.title')}
          validation={{
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
          form={form}
          label={t(target + 'director.youtube.label')}
          id="director-youtube"
          name="director.youtube"
          placeholder=""
          title={t(target + 'director.youtube.title')}
          validation={{
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
          form={form}
          label={t(target + 'director.linkedin.label')}
          id="director-linkedin"
          name="director.linkedin"
          placeholder=""
          title={t(target + 'director.linkedin.title')}
          validation={{
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
          form={form}
          label={t(target + 'director.twitter.label')}
          id="director-twitter"
          name="director.twitter"
          placeholder=""
          title={t(target + 'director.twitter.title')}
          validation={{
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

        <div className="w-full"></div>
      </div>
      <p className="pt-4 pb-3 self-center text-2xl">
        {t(target + 'collaborators.header')}
      </p>
      <div className="flex flex-col gap-4 w-full pb-5">
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormNewCollaborator index={index} form={form} remove={remove} />
          </div>
        ))}
      </div>
      <button
        className="border border-gray rounded-sm mr-2 mb-3 px-2 py-2 self-center cursor-pointer uppercase font-bold bg-secondary transition-all hover:bg-neutral-600"
        type="button"
        onClick={addCollaborator}
      >
        {t(target + 'collaborators.button')}
      </button>
    </FormSection>
  );
}

export default MovieSubmitTeamComposition;
