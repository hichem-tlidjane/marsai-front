import { useEffect, useState, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

function Newsletter() {
  const api = useApi();
  const [newsletters, setNewsletters] = useState([]);

  // State for the "Read Details" modal
  const [selectedId, setSelectedId] = useState(null);

  // States for the "Create Newsletter" modal
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      object: '',
      content: '',
      isScheduled: false,
      sendAt: '',
    },
  });

  // Watch the scheduling toggle to conditionally render the date picker
  const isScheduled = watch('isScheduled');

  // Moved fetch logic into a reusable callback
  const fetchNewsletters = useCallback(async () => {
    const res = await api('/newsletters');
    if (res) {
      const news = await res.json();
      setNewsletters(news);
    }
  }, [api]);

  // Initial load
  useEffect(() => {
    fetchNewsletters();
  }, [fetchNewsletters]);

  // Handle form submission via react-hook-form
  const onSubmit = async data => {
    setIsSubmitting(true);
    const payload = {
      object: data.object,
      content: data.content,
      sendAt: data.isScheduled ? new Date(data.sendAt).toISOString() : null,
    };

    try {
      const res = await api('/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // If the post was successful, refetch the list
      if (res && res.ok) {
        await fetchNewsletters();

        // Close modal and reset form completely
        setIsCreating(false);
        reset();
      }
    } catch (error) {
      console.error('Failed to create newsletter', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatus = newsletter => {
    if (newsletter.sent) {
      return {
        label: 'Sent',
        badgeColors:
          'bg-green-500/10 text-green-400 border border-green-500/20',
      };
    }
    if (!newsletter.sendAt) {
      return {
        label: 'Failed',
        badgeColors:
          'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20',
      };
    }
    const sendDate = new Date(newsletter.sendAt);
    const now = new Date();
    if (sendDate > now) {
      return {
        label: 'Scheduled',
        badgeColors: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
      };
    }
    return {
      label: 'Pending',
      badgeColors:
        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    };
  };

  const formatDate = dateValue => {
    if (!dateValue) return 'Not set';
    return new Date(dateValue).toLocaleString();
  };

  const selectedNewsletter = newsletters.find(nl => nl.id === selectedId);

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans text-neutral-300 relative min-h-screen">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Newsletters</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-secondary border border-neutral-400/10 hover:border-neutral-400 cursor-pointer text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-neutral-800/20"
        >
          Create Newsletter
        </button>
      </header>

      {newsletters.length === 0 ? (
        <div className="text-center p-12 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-400">
          No newsletters found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsletters.map(nl => {
            const status = getStatus(nl);
            return (
              <motion.div
                layoutId={`card-${nl.id}`}
                key={nl.id}
                onClick={() => setSelectedId(nl.id)}
                className="bg-secondary border border-neutral-500 rounded-xl p-5 flex flex-col shadow-sm cursor-pointer hover:shadow-xl hover:shadow-black/20 hover:border-neutral-300 transition-all duration-100"
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="m-0 text-lg font-semibold text-white leading-snug">
                    {nl.object}
                  </h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${status.badgeColors}`}
                  >
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 grow line-clamp-3 mb-5">
                  {nl.content}
                </p>
                <div className="border-t border-neutral-700 pt-4 mt-auto">
                  <span className="text-xs text-neutral-400 font-medium">
                    {status.label === 'Scheduled' &&
                      `Sending: ${formatDate(nl.sendAt)}`}
                    {status.label === 'Sent' &&
                      `Sent at: ${formatDate(nl.sendAt)}`}
                    {status.label === 'Failed' &&
                      `Created: ${formatDate(nl.createdAt)}`}
                    {status.label === 'Pending' &&
                      `Processing since: ${formatDate(nl.sendAt)}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modals Container */}
      <AnimatePresence>
        {/* 1. Read Details Modal */}
        {selectedId && selectedNewsletter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm pointer-events-auto cursor-pointer"
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-secondary border border-neutral-600 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 pointer-events-auto overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-600 flex justify-between items-start sticky top-0 bg-secondary backdrop-blur z-20">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedNewsletter.object}
                  </h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatus(selectedNewsletter).badgeColors}`}
                  >
                    {getStatus(selectedNewsletter).label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="bg-primary hover:bg-neutral-600 text-neutral-300 rounded-full p-2 transition-colors cursor-pointer"
                >
                  <IoClose className="size-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto grow">
                <p className="text-base text-neutral-300 whitespace-pre-wrap leading-relaxed">
                  {selectedNewsletter.content}
                </p>
              </div>
              <div className="p-6 bg-primary border-t border-neutral-600 mt-auto">
                <span className="text-sm text-neutral-400 font-medium">
                  {getStatus(selectedNewsletter).label === 'Scheduled' &&
                    `Sending: ${formatDate(selectedNewsletter.sendAt)}`}
                  {getStatus(selectedNewsletter).label === 'Sent' &&
                    `Sent at: ${formatDate(selectedNewsletter.sendAt)}`}
                  {getStatus(selectedNewsletter).label === 'Failed' &&
                    `Created: ${formatDate(selectedNewsletter.createdAt)}`}
                  {getStatus(selectedNewsletter).label === 'Pending' &&
                    `Processing since: ${formatDate(selectedNewsletter.sendAt)}`}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. Create Newsletter Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreating(false);
                reset();
              }}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm pointer-events-auto cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-secondary border border-neutral-600 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 pointer-events-auto overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-600 flex justify-between items-center bg-secondary backdrop-blur z-20">
                <h3 className="text-xl font-bold text-white">
                  Compose Newsletter
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    reset();
                  }}
                  className="bg-primary hover:bg-neutral-600 text-neutral-300 rounded-full p-2 transition-colors cursor-pointer"
                >
                  <IoClose className="size-5" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col grow overflow-y-auto p-6 gap-5"
              >
                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    {...register('object', { required: 'Subject is required' })}
                    className={`w-full bg-primary border text-white rounded-lg p-3 outline-none focus:ring-1 transition-all placeholder:text-neutral-500 ${
                      errors.object
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-neutral-600 focus:border-neutral-400 focus:ring-neutral-400'
                    }`}
                    autoFocus
                  />
                  {errors.object && (
                    <span className="text-red-400 text-xs mt-1.5 block">
                      {errors.object.message}
                    </span>
                  )}
                </div>

                {/* Content Input */}
                <div className="grow flex flex-col">
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Content
                  </label>
                  <textarea
                    rows="8"
                    {...register('content', {
                      required: 'Content is required to send a newsletter',
                    })}
                    className={`w-full grow bg-primary border text-white rounded-lg p-3 outline-none focus:ring-1 transition-all placeholder:text-neutral-500 resize-none ${
                      errors.content
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-neutral-600 focus:border-neutral-400 focus:ring-neutral-400'
                    }`}
                    placeholder="Write your newsletter here..."
                  />
                  {errors.content && (
                    <span className="text-red-400 text-xs mt-1.5 block">
                      {errors.content.message}
                    </span>
                  )}
                </div>

                {/* Scheduling Toggle & Input */}
                <div className="bg-primary/50 p-4 rounded-lg border border-neutral-600/50">
                  <label className="flex items-center gap-3 cursor-pointer w-max">
                    <input
                      type="checkbox"
                      {...register('isScheduled')}
                      className="w-4 h-4 rounded border-neutral-500 bg-secondary text-neutral-400 focus:ring-neutral-400 focus:ring-offset-primary cursor-pointer"
                    />
                    <span className="text-sm font-medium text-neutral-300">
                      Schedule for later
                    </span>
                  </label>

                  <AnimatePresence>
                    {isScheduled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="datetime-local"
                          {...register('sendAt', {
                            required: isScheduled
                              ? 'Please select a date and time to schedule'
                              : false,
                            validate: value => {
                              if (!isScheduled) return true;
                              const selectedDate = new Date(value).getTime();
                              const now = new Date().getTime();
                              return (
                                selectedDate > now ||
                                'You cannot schedule a newsletter in the past'
                              );
                            },
                          })}
                          className={`w-full bg-secondary border text-white rounded-lg p-2.5 outline-none focus:ring-1 transition-all [color-scheme:dark] ${
                            errors.sendAt
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-neutral-500 focus:border-neutral-400 focus:ring-neutral-400'
                          }`}
                        />
                        {errors.sendAt && (
                          <span className="text-red-400 text-xs mt-1.5 block">
                            {errors.sendAt.message}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-neutral-600">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      reset();
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white bg-transparent hover:bg-neutral-600 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-secondary border border-neutral-500 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-black/20 transition-all cursor-pointer"
                  >
                    {isSubmitting
                      ? 'Processing...'
                      : isScheduled
                        ? 'Schedule Newsletter'
                        : 'Send Now'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Newsletter;
