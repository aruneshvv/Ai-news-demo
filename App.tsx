import React, { useState, useEffect } from 'react';
import { fetchAiWebEngineeringNews } from './services/geminiService';
import type { GroundingChunk, NewsItem } from './types';

const BrainCircuitIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-cyan-400">
        <path d="M12 2a10 10 0 0 0-2.828 17.172M12 2a10 10 0 0 1 2.828 17.172"/>
        <path d="M12 2v4"/><path d="M5.172 7.172a10 10 0 0 1 13.656 0"/>
        <path d="M12 12v10"/><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
        <path d="M12 12h-4"/><path d="M12 12h4"/><path d="M7 17h10"/>
        <path d="M7 17a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
        <path d="M17 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
    </div>
);


const App: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { newsItems, sources } = await fetchAiWebEngineeringNews();
                setNewsItems(newsItems);
                setSources(sources);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="text-center mb-10">
                    <div className="flex justify-center items-center gap-4 mb-2">
                        <BrainCircuitIcon />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            AI in Web Engineering
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400">The Latest News & Trends from the Past Week, Grounded in Reality</p>
                </header>

                <main className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-gray-700">
                        {isLoading && <LoadingSpinner />}
                        {error && <ErrorDisplay message={error} />}
                        {!isLoading && !error && (
                            <>
                                <div className="space-y-8">
                                    {newsItems.map((item, index) => (
                                        <article key={index} className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10">
                                            <h2 className="text-2xl font-bold text-cyan-300 mb-3">{item.title}</h2>
                                            <p className="text-gray-300 leading-relaxed">{item.summary}</p>
                                        </article>
                                    ))}
                                </div>
                                
                                {sources.length > 0 && (
                                    <div className="mt-10 pt-6 border-t border-gray-700">
                                        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Sources</h2>
                                        <ul className="space-y-3">
                                            {sources.map((source, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-cyan-400 mr-3 mt-1">&#8227;</span>
                                                    <a
                                                        href={source.web.uri}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 break-all"
                                                    >
                                                        {source.web.title || source.web.uri}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
                <footer className="text-center mt-10 text-gray-500 text-sm">
                    <p>Powered by Gemini and Google Search</p>
                </footer>
            </div>
        </div>
    );
};

export default App;