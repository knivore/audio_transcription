import {TableCell, TableRow} from '@/app/components/ui/table';
import {Transcription} from '@/app/library/types';
import React from 'react';

export function TranscriptionRecord({transcription}: { transcription: Transcription }) {
    return (
        <TableRow>
            <TableCell className="hidden md:table-cell text-center">{transcription.id}</TableCell>
            <TableCell className="text-center">{transcription.filename}</TableCell>
            <TableCell className="text-center">
                {transcription.transcribed_text}
            </TableCell>
            <TableCell className="text-center">{transcription.created_at}</TableCell>
        </TableRow>
    );
}
