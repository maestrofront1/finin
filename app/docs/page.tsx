'use client'
import {Container} from '@shared/ui/Container'
import { TfiDownload } from "react-icons/tfi";
import Button from "@shared/ui/Button";
import Image from "next/image";
import MockImg from "../../public/img/mock/card-1.png"
import {cn} from "@shared/lib/utils";
import {useState, useEffect} from "react";
import {DocumentFile} from "@shared/lib/documents";

const Tabs = ["Все документы", "Раскрытие информации", "Архив", "Документы площадки"];

export default function DocsPage() {

    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const [activeTab, setActiveTab] = useState(0)
    const [docs, setDocs] = useState<DocumentFile[]>([])
    const [loading, setLoading] = useState(true)

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };
    
    useEffect(() => {
        // Загружаем документы при монтировании компонента
        const loadDocuments = async () => {
            try {
                const response = await fetch('/api/documents')
                if (response.ok) {
                    const documents = await response.json()
                    setDocs(documents)
                } else {
                    console.error('Ошибка загрузки документов:', response.statusText)
                }
            } catch (error) {
                console.error('Ошибка загрузки документов:', error)
            } finally {
                setLoading(false)
            }
        }
        
        loadDocuments()
    }, [])
    
    const handleOpenDocument = (href: string) => {
        window.open(href, '_blank');
    }
    
    const handleDownloadDocument = (href: string, filename: string) => {
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <Container>
            <div className="flex flex-col gap-10 mb-[100px] mt-[120px] con-container">

                <div className="flex items-center justify-between w-full py-4 px-6 bg-white rounded-[12px] shadow-sm sm:hidden">
                    <h2 className="text-[18px] sm:text-[20px] font-semibold text-gray-900">Все документы</h2>
                    <button
                        onClick={() => setShowFilters(true)}
                        className="flex items-center justify-center w-[40px] h-[40px]  hover:bg-gray-200 rounded-full active:bg-gray-300"
                    >
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.24609 7.52734H18.8881" stroke="#C9CFD9" stroke-width="1.5" stroke-linecap="square"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.26039 7.46686C9.26039 6.02479 8.08265 4.85547 6.63019 4.85547C5.17774 4.85547 4 6.02479 4 7.46686C4 8.90894 5.17774 10.0783 6.63019 10.0783C8.08265 10.0783 9.26039 8.90894 9.26039 7.46686Z" stroke="#C9CFD9" stroke-width="1.5" stroke-linecap="square"/>
                            <path d="M14.7539 17.1406H5.11187" stroke="#C9CFD9" stroke-width="1.5" stroke-linecap="square"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7396 17.0801C14.7396 15.6381 15.9174 14.4688 17.3698 14.4688C18.8223 14.4688 20 15.6381 20 17.0801C20 18.5222 18.8223 19.6915 17.3698 19.6915C15.9174 19.6915 14.7396 18.5222 14.7396 17.0801Z" stroke="#C9CFD9" stroke-width="1.5" stroke-linecap="square"/>
                        </svg>

                    </button>
                </div>


                {showFilters && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-[20px] w-[90%] max-w-[400px] p-6 shadow-xl">
                            <h3 className="text-lg font-semibold mb-4">Фильтры документов</h3>
                            <div className="flex flex-col gap-3 mb-6 lg:hidden">
                                {Tabs.map((tab, i) => (
                                    <label key={i} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.includes(tab)}
                                            onChange={() => toggleFilter(tab)}
                                            className="accent-green-500 w-5 h-5"
                                        />
                                        <span className="text-gray-800">{tab}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-100"
                                >
                                    Закрыть
                                </button>
                                <button
                                    onClick={() => {
                                        // применить фильтры
                                        setShowFilters(false);
                                    }}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                                >
                                    Применить
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                {/* Табы */}
                <div className=" flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 hidden md:flex">
                    {Tabs.map((tab, i) => (
                        <span
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={cn(
                                "cursor-pointer text-center sm:text-left hover:underline px-2 py-1 border-l-0 sm:border-l-2 sm:border-gray-300",
                                activeTab === i ? "text-gray-400" : "text-gray-300"
                            )}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        <div className="col-span-3 text-center py-10">
                            <p>Загрузка документов...</p>
                        </div>
                    ) : docs.length === 0 ? (
                        <div className="col-span-3 text-center py-10">
                            <p>Документы не найдены</p>
                        </div>
                    ) : (
                        docs.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col justify-between p-6 sm:p-8 rounded-[20px] bg-white shadow-md h-auto sm:h-[368px] w-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 text-sm">31 июля 2025г</span>
                                </div>

                                {/* Заголовок */}
                                <h3 className="text-gray-900 text-[18px] sm:text-[20px] font-semibold leading-snug mb-6">
                                    {item.title}
                                </h3>

                                {/* Кнопки */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3041_2442)">
                                            <path d="M44.5489 0.273438H25.0288H23.5162L22.4473 1.36492L7.67031 16.4573L6.60156 17.5487V19.0928V50.2077C6.60156 55.7577 11.0225 60.2736 16.4578 60.2736H44.5489C49.9825 60.2736 54.4034 55.7577 54.4034 50.2077V10.3394C54.4034 4.78844 49.9825 0.273438 44.5489 0.273438ZM50.7548 50.2076C50.7548 53.7088 47.9764 56.5464 44.5489 56.5464H16.4578C13.0287 56.5464 10.2503 53.7088 10.2503 50.2076V19.0927H19.8563C22.7118 19.0927 25.0288 16.7281 25.0288 13.8111V4.00047H44.5489C47.9764 4.00047 50.7548 6.83805 50.7548 10.3394V50.2076Z" fill="#00A772"/>
                                            <path d="M20.8562 29.8945H17.5826C16.9593 29.8945 16.5859 30.3086 16.5859 30.9287V39.5718C16.5859 40.3204 17.0683 40.8138 17.7381 40.8138C18.3934 40.8138 18.8757 40.3205 18.8757 39.5718V36.9461C18.8757 36.8822 18.9077 36.8503 18.9702 36.8503H20.8562C23.162 36.8503 24.5497 35.4176 24.5497 33.3802C24.5498 31.3109 23.1781 29.8945 20.8562 29.8945ZM20.7153 34.8285H18.9702C18.9077 34.8285 18.8757 34.7966 18.8757 34.7336V32.0113C18.8757 31.9474 18.9077 31.9157 18.9702 31.9157H20.7153C21.6815 31.9157 22.2583 32.5048 22.2583 33.3803C22.2584 34.2557 21.6815 34.8285 20.7153 34.8285Z" fill="#00A772"/>
                                            <path d="M29.8341 29.8945H27.3248C26.7015 29.8945 26.3281 30.3086 26.3281 30.9287V39.6994C26.3281 40.3205 26.7014 40.7181 27.3248 40.7181H29.8341C32.0934 40.7181 33.4971 39.9858 34.0579 38.2192C34.2598 37.5981 34.3703 36.8503 34.3703 35.3062C34.3703 33.7623 34.2597 33.0144 34.0579 32.3934C33.497 30.6268 32.0934 29.8945 29.8341 29.8945ZM31.8611 37.4075C31.5951 38.2666 30.8324 38.6332 29.7715 38.6332H28.7124C28.6499 38.6332 28.6179 38.6013 28.6179 38.5376V32.0752C28.6179 32.0113 28.6499 31.9794 28.7124 31.9794H29.7715C30.8324 31.9794 31.5951 32.346 31.8611 33.2052C31.9701 33.5718 32.047 34.2083 32.047 35.3064C32.047 36.4044 31.97 37.041 31.8611 37.4075Z" fill="#00A772"/>
                                            <path d="M42.57 29.8945H37.428C36.8047 29.8945 36.4297 30.3086 36.4297 30.9287V39.5718C36.4297 40.3204 36.9137 40.8138 37.5835 40.8138C38.2372 40.8138 38.7211 40.3205 38.7211 39.5718V36.4837C38.7211 36.4207 38.7515 36.3888 38.814 36.3888H41.8073C42.477 36.3888 42.8664 35.9749 42.8664 35.3857C42.8664 34.7965 42.477 34.3834 41.8073 34.3834H38.814C38.7515 34.3834 38.7211 34.3515 38.7211 34.2877V32.0113C38.7211 31.9474 38.7515 31.9157 38.814 31.9157H42.57C43.2093 31.9157 43.6308 31.4861 43.6308 30.9134C43.6307 30.324 43.2092 29.8945 42.57 29.8945Z" fill="#00A772"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3041_2442">
                                                <rect width="60" height="60" fill="white" transform="translate(0.5 0.273438)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <button
                                        onClick={() => handleOpenDocument(item.href)}
                                        className="rounded-[10px] px-6 py-3 bg-gray-200 hover:bg-gray-100 active:bg-gray-200 text-gray-700 w-full sm:max-w-[140px]"
                                    >
                                        открыть
                                    </button>
                                    <button
                                        onClick={() => handleDownloadDocument(item.href, item.filename)}
                                        className="rounded-[10px] px-6 py-3 bg-[#00A772] hover:bg-green-400 active:bg-green-500 text-white w-full sm:max-w-[140px] flex items-center justify-center gap-2"
                                    >
                                        скачать
                                        <TfiDownload />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>



            </div>

        </Container>
    );
}


