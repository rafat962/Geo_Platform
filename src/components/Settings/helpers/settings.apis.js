import axiosInstance from "../../Auth/inceptron/axiosInstance";

const updateUserApi = async (data) => {
    try {
        const response = await axiosInstance.post(`users/updateUser`, data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const updatePasswordApi = async (data) => {
    try {
        const response = await axiosInstance.patch(
            `users/updatePassword`,
            data
        );
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const getPendingUsersApi = async (data) => {
    try {
        const response = await axiosInstance.get(`user/getPendingUsers`, data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const getAllUsersApi = async () => {
    try {
        const response = await axiosInstance.get(`user/getAllUsers`);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const acceptPendingEmail = async (id) => {
    try {
        const response = await axiosInstance.patch(
            `user/acceptPendingEmail/${id}`
        );
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

const rejectUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`user/rejectUser/${id}`);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

const deActiviteUser = async (id) => {
    try {
        const response = await axiosInstance.patch(`user/deActiviteUser/${id}`);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const ActiviteUser = async (id) => {
    try {
        const response = await axiosInstance.patch(`user/ActiviteUser/${id}`);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const userLogs = async (item) => {
    try {
        const response = await axiosInstance.get(`user/logs/${item}`);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

// --------------------- Permissions ---------------------
const setPermission = async (item, permissions) => {
    try {
        const response = await axiosInstance.post(
            `user/permissions/${item}`,
            permissions
        );
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
// --------------------- getPermissions ---------------------

const getPermissions = async (item) => {
    try {
        const response = await axiosInstance.get(`user/getPermissions/${item}`);
        return response?.data?.permissions;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
export {
    updateUserApi,
    updatePasswordApi,
    getPendingUsersApi,
    acceptPendingEmail,
    rejectUser,
    getAllUsersApi,
    deActiviteUser,
    ActiviteUser,
    userLogs,
    setPermission,
    getPermissions,
};
