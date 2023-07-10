export const EDGE_IP = typeof window !== 'undefined' && window.location.host ? window.location.host.split(':')[0] : "10.42.0.1";

export const EDGE_WEBRTC_PORT = "8084";
export const EDGE_ROS_PORT = "9090";
export const EDGE_TMUX_PORT = "8086";

export const CONNECTION_TIMEOUT = 5000; //ms
export const HOME_DIR = `/home/tong`;
export const DL_DIR = `${HOME_DIR}/Downloads`;
export const SERVER_COMMAND = `bash -c '${HOME_DIR}/server/stop.sh; source /opt/ros/foxy/setup.bash; source /opt/ros/humble/setup.bash; source ${HOME_DIR}/workspace/install/setup.bash; source ${HOME_DIR}/ros2_ws/install/setup.bash; source ${HOME_DIR}/server/run.sh' &`;
export const SHUTDOWN_COMMAND = `echo "khadas" | sudo -S poweroff`;
export const REBOOT_COMMAND = `echo "khadas" | sudo -S reboot`;

export const CONNECTIONS_STATES = {
    PROCESSING: 'PROCESSING',
    DONE: 'DONE',
    FAILED: 'FAILED',
    INIT: 'INIT'
};

export const BUTTON_TYPES = {
    H: 'HORIZONTAL_ICON_TEXT',
    V: 'VERTICAL_ICON_TEXT'
}