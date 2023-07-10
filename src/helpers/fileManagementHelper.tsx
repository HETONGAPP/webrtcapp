"use server";

import checkDiskSpace from 'check-disk-space'
import fs from 'fs';
import { DL_DIR } from '@/constants';
import { exec } from 'child_process';

export async function getFreeSpace() {
    return formatSizeUnits((await checkDiskSpace(DL_DIR)).free);
};

export async function remove(path: string) {
    return await new Promise((resolve, reject) => {
        console.log('removing', path)
        if (path) exec('rm -rf ' + DL_DIR + '/' + path, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            if (stderr) {
                console.error(stderr);
                return reject(stderr);
            }
            console.log(stdout);
            return resolve(stdout);
        });
        else reject('Empty path for removing!');
    });
};

export async function getLocalFiles(extension: string) {
    return await new Promise<Array<{ fileName: string, fileSize: number }>>((resolve, reject) => {
        console.log('ls:', DL_DIR);
        fs.readdir(DL_DIR, (err, files) => {
            console.log('local files', files)
            if (err) return reject(err);
            return resolve(files
                .filter(file => file.endsWith('.' + extension))
                .sort().reverse()
                .map(fileName => ({ fileName: fileName, fileSize: formatSizeUnits(fs.statSync(DL_DIR + '/' + fileName).size) })));
        });
    });
};

function formatSizeUnits(bytes: any) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    return bytes;
};