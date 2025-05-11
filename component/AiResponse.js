import React from 'react';

const AiResponse = ({ onClose, isLoading, responseData }) => {
  if (!responseData && !isLoading) return null;

  return (
    <div className="fixed top-18 inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-6xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content with Scroll */}
        <div className="overflow-y-auto pr-4 space-y-8 mt-8">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
            🎓 Personalized AI Learning Plan
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="animate-spin h-14 w-14 text-purple-500 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                Generating your personalized plan...
              </p>
            </div>
          ) : (
            <>
              {/* Summary Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Topic" value={responseData.topic} />
                <InfoItem label="Time to Complete" value={responseData.time_to_complete} />
                <InfoItem label="Level" value={responseData.level} />
                <InfoItem label="Estimated Hours" value={responseData.estimated_total_hours} />
              </div>

              {/* Sections */}
              <Section title="🎯 Overall Goal" content={responseData.overall_goal} />

              {/* Weekly Plan */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📅 Weekly Plan
                </h3>
                {responseData.weekly_plan?.map((week, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 space-y-6">
                    <h4 className="text-xl font-semibold text-purple-600">
                      Week {week.week_number}: {week.topic_focus}
                    </h4>

                    <Section title="🧠 Learning Objectives" list={week.learning_objectives} />
                    <Section title="⏳ Estimated Hours" content={`${week.estimated_hours} hours`} />
                    <Section title="📖 Introduction" content={week.introduction} />
                    <Section title="🔑 Key Concepts" list={week.key_concepts_this_week} />

                    {/* Activities */}
                    <div className="space-y-4">
                      <h5 className="font-semibold text-lg text-gray-800 dark:text-white">🛠️ Key Activities</h5>
                      {week.key_activities?.map((activity, idx) => (
                        <div key={idx} className="p-4 bg-white dark:bg-gray-700 rounded-xl border dark:border-gray-600 space-y-3">
                          <p className='text-black'><span className="font-semibold">Activity:</span> {activity.activity}</p>
                          <p className='text-black'><span className="font-semibold">Duration:</span> {activity.estimated_duration}</p>
                          <p className='text-black'><span className="font-semibold">Focus:</span> {activity.learning_focus}</p>

                          {/* Resources */}
                          {activity.resources?.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <p className="font-semibold text-black">🔗 Resources: </p>
                              <ul className="list-disc ml-6 text-blue-600 dark:text-blue-400 space-y-1">
                                {activity.resources.map((resource, ridx) => (
                                  <li key={ridx}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ">
                                      {resource.title}
                                    </a> — {resource.description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <p className="mt-2 text-gray-600"><span className="font-semibold ">Deliverables:</span> {activity.deliverables}</p>
                        </div>
                      ))}
                    </div>

                    {/* Assessment */}
                    <div className="space-y-2">
                      <h5 className="font-semibold text-lg text-gray-800">📝 Assessment</h5>
                      <p className='text-black'><span className="font-semibold">Type:</span> {week.assessment.type}</p>
                      <p className='text-black'><span className="font-semibold">Description:</span> {week.assessment.description}</p>
                      <p className='text-black'><span className="font-semibold">Instructions:</span> {week.assessment.instructions}</p>
                    </div>

                    <Section title="🗒️ Notes for the Week" content={week.notes_for_the_week} />
                  </div>
                ))}
              </div>

              {/* Summary Sections */}
              <Section title="📋 Overall Summary" content={responseData.overall_summary} />
              <Section title="⚠️ Potential Challenges" list={responseData.potential_challenges} />
              <Section title="🚀 Suggested Next Steps" content={responseData.suggested_next_steps} />
              <Section title="🧾 Generation Notes" content={responseData.generation_notes} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiResponse;

// Sub Components
const InfoItem = ({ label, value }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex flex-col gap-1 hover:shadow-md transition duration-300">
    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-lg font-bold text-gray-900 dark:text-white break-words">{value}</p>
  </div>
);

const Section = ({ title, content, list }) => (
  <div className="space-y-3">
    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
    {list ? (
      <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700 dark:text-gray-300 break-words">{content}</p>
    )}
  </div>
);
