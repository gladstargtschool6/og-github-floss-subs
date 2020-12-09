import { updateUsername } from '../utils/useDatabase';

const userNameUpdate = async (user, userName) => {
    await updateUsername(user, userName)
}

export default userNameUpdate;