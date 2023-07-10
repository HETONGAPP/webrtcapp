"use server";

import { CONNECTION_TIMEOUT, SERVER_COMMAND, SHUTDOWN_COMMAND, REBOOT_COMMAND } from '@/constants';
import { exec } from 'child_process';

export async function restartServers() {
    return new Promise((resolve, reject) => {
        exec(SERVER_COMMAND, (err, stdout, stderr) => {
            console.log('in restart servers:', stdout, err, stderr);
            if (err) {
                console.error(err);
                return reject(err);
            }
            if (stderr) {
                console.error(stderr);
                return reject(stderr);
            }
            return resolve(stdout);
        });
        setTimeout(()=> {
            resolve(true);
        }, CONNECTION_TIMEOUT);
    });
};

export async function shutdown() {
    return new Promise((reject, resolve) => {
        exec(SHUTDOWN_COMMAND, (err, stdout, stderr) => {
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
    });
};

export async function reboot() {
    return new Promise((reject, resolve) => {
        exec(REBOOT_COMMAND, (err, stdout, stderr) => {
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
    });
};

