import React, { use } from 'react';

import { getFreeSpace, getLocalFiles } from '@/helpers/fileManagementHelper';
import Files from './Files';


export default function Records() {


    const freeSpace = use(getFreeSpace());
    const edgeFiles = use(getLocalFiles('zip'));

    return (
        <Files freeSpace={freeSpace} edgeFiles={edgeFiles} />
    );
}