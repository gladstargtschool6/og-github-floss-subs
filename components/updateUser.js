import { supabase } from '../utils/initSupabase';

const updateUsername = async (user, userName) => {
    const userData = {
      ...user,
      full_name: userName
    };
    const { error } = await supabase
      .from('users')
      .update({full_name: userData.full_name})
      .match({id: userData.id})
    if (error) throw error;
    console.log(`User updated: ${user.id}`);
  };

export {
    updateUsername
}