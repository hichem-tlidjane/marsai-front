import stars from '../assets/stars.png';
import arrow from '../assets/arrow.png';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { CiLock } from 'react-icons/ci';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import TopPage from './base/TopPage';
import TitlePage from './base/TitlePage';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function onSubmit(data) {
    setError(null);
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_ADDRESS + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (res.ok) {
        // const data = await res.json();
        navigate('/');
      } else {
        setError(t('login.errors.invalidCredentials'));
      }
    } catch (e) {
      console.error('error: ', e);
      setError(t('login.errors.default'));
    }
  }

  return (
    <div className="">
      <TopPage>
        <TitlePage hasUnderline>{t('login.title')}</TitlePage>
      </TopPage>
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <div className=" flex flex-col items-center">
            <div className="flex justify-center text-zinc-100 mb-10 gap-4">
              <img className="size-7" src={stars} alt="stars" />
              <p className=""> {t('login.subTitle')}</p>
            </div>

            <form
              className="bg-primary p-8 w-full sm:max-w-150 rounded-2xl flex flex-col gap-7 max-w-11/12"
              onSubmit={handleSubmit(onSubmit)}
            >
              {error && (
                <div className="flex items-center space-x-1 text-red-500">
                  <MdOutlineReportGmailerrorred size={24} />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-dark text-xs font-bold" htmlFor="email">
                  {t('login.emailLabel')}
                </label>
                <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
                  <HiOutlineEnvelope className="text-zinc-300" size={24} />
                  <input
                    className=" placeholder:font-bold outline-0 w-full"
                    type="email"
                    id="email"
                    name="email"
                    {...register('email', { required: true })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-dark text-xs font-bold"
                  htmlFor="password"
                >
                  {t('login.passwordLabel')}
                </label>
                <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
                  <CiLock size={24} />
                  <input
                    className="placeholder:font-bold outline-0 w-full"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="*************************"
                    {...register('password', { required: 'test' })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-secondary text-white rounded-xl h-14 font-bold cursor-pointer hover:bg-accent active:bg-primary"
              >
                {t('login.submitBtn')}
              </button>
            </form>

            <Link
              to={'/'}
              className="flex justify-center items-center text-zinc-100 py-6 gap-2 cursor-pointer"
            >
              <img
                className="size-7 rotate-180"
                src={arrow}
                alt="fleche de retour"
              />
              <div> {t('login.backBtn')}</div>
            </Link>
          </div>
        </div>
      </section>
      {/*       <div className="flex justify-center text-zinc-100 my-10 gap-4">
        <img className="size-7" src={stars} alt="stars" />
        <p className=""> {t('login.subTitle')}</p>
      </div>

      <form
        className="bg-primary p-8 w-full sm:max-w-150 rounded-2xl flex flex-col gap-7 max-w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div className="flex items-center space-x-1 text-red-500">
            <MdOutlineReportGmailerrorred size={24} />
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-dark text-xs font-bold" htmlFor="email">
            {t('login.emailLabel')}
          </label>
          <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
            <HiOutlineEnvelope className="text-zinc-300" size={24} />
            <input
              className=" placeholder:font-bold outline-0 w-full"
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-dark text-xs font-bold" htmlFor="password">
            {t('login.passwordLabel')}
          </label>
          <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
            <CiLock size={24} />
            <input
              className="placeholder:font-bold outline-0 w-full"
              type="password"
              id="password"
              name="password"
              placeholder="*************************"
              {...register('password', { required: 'test' })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-xl h-14 font-bold cursor-pointer hover:bg-blue-600 active:bg-primary"
        >
          {t('login.submitBtn')}
        </button>
      </form>

      <Link
        to={'/'}
        className="flex justify-center items-center text-zinc-100 py-6 gap-2 cursor-pointer"
      >
        <img className="size-7 rotate-180" src={arrow} alt="fleche de retour" />
        <div> {t('login.backBtn')}</div>
      </Link> */}
    </div>
  );
}

export default Login;

/* 
    <div className=" flex flex-col items-center w-full py-4 pt-17 min-h-screen">
      <div className="text-3xl sm:text-5xl font-bold text-white text-center mt-10">
        {t('login.title')}
      </div>
      <div className="flex justify-center text-zinc-100 my-10 gap-4">
        <img className="size-7" src={stars} alt="stars" />
        <p className=""> {t('login.subTitle')}</p>
      </div>

      <form
        className="bg-primary p-8 w-full sm:max-w-150 rounded-2xl flex flex-col gap-7 max-w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div className="flex items-center space-x-1 text-red-500">
            <MdOutlineReportGmailerrorred size={24} />
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-dark text-xs font-bold" htmlFor="email">
            {t('login.emailLabel')}
          </label>
          <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
            <HiOutlineEnvelope className="text-zinc-300" size={24} />
            <input
              className=" placeholder:font-bold outline-0 w-full"
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-dark text-xs font-bold" htmlFor="password">
            {t('login.passwordLabel')}
          </label>
          <div className="flex items-center gap-4 bg-zinc-800 rounded-xl h-14 text-zinc-50  outline-2 outline-neutral-400 px-4 focus-within:outline-neutral-300">
            <CiLock size={24} />
            <input
              className="placeholder:font-bold outline-0 w-full"
              type="password"
              id="password"
              name="password"
              placeholder="*************************"
              {...register('password', { required: 'test' })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-xl h-14 font-bold cursor-pointer hover:bg-blue-600 active:bg-primary"
        >
          {t('login.submitBtn')}
        </button>
      </form>

      <Link
        to={'/'}
        className="flex justify-center items-center text-zinc-100 py-6 gap-2 cursor-pointer"
      >
        <img className="size-7 rotate-180" src={arrow} alt="fleche de retour" />
        <div> {t('login.backBtn')}</div>
      </Link>
    </div>
*/
