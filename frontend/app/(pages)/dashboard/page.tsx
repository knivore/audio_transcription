'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/app/components/ui/tabs';
import {TranscriptionTable} from './transcription_table';
import {useEffect, useState} from 'react';
import {Spinner} from "@/app/components/ui/icons";
import FileUpload from "@/app/components/file_upload";
import {SearchInput} from "@/app/(pages)/dashboard/search";

export default function DashboardPage() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [error, setError] = useState<string | null>(null); // Explicitly typing error as string or null

    const handleUploadSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleSearchResults = (results) => {
        setTranscriptions(results || []);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/transcriptions`)
            .then((res) => res.json())
            .then((data) => {
                setTranscriptions(data.result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [refreshTrigger]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <SearchInput onSearchSuccess={handleSearchResults}/>
                    <FileUpload isActive={isActive} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}
                                onUploadSuccess={handleUploadSuccess}/>
                </div>
            </div>

            <TabsContent value="all">
                <TranscriptionTable transcriptions={transcriptions}/>
            </TabsContent>
        </Tabs>
    );
}
