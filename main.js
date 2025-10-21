window.addPoints = async function(username, amount) {
  const { data: userData, error: fetchError } = await supabaseClient
    .from('users')
    .select('username, points')
    .eq('username', username);

  console.log('Raw fetch result:', userData);

  if (fetchError || !userData || userData.length === 0) {
    console.error('Error fetching user:', fetchError);
    return;
  }

  const newPoints = userData[0].points + amount;

  const { data, error } = await supabaseClient
    .from('users')
    .update({ points: newPoints })
    .eq('username', username);

  if (error) {
    console.error('Error updating points:', error);
  } else {
    console.log('Points updated:', data);
  }
};
