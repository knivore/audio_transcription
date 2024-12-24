'use client';

import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/app/components/ui/table';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/app/components/ui/card';
import {TranscriptionRecord} from './transcription_record';
import {Transcription} from '@/app/library/types';

export function TranscriptionTable({transcriptions}: {
    transcriptions: Transcription[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audio Transcriptions</CardTitle>
                <CardDescription>
                    View transcribed audio files
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell text-center">Transcription ID</TableHead>
                            <TableHead className="text-center">Filename</TableHead>
                            <TableHead className="text-center">Transcription</TableHead>
                            <TableHead className="text-center">Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transcriptions.map((transcription: Transcription) => (
                            <TranscriptionRecord key={transcription.id} transcription={transcription}/>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
