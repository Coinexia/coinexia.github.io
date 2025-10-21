window.addEventListener('DOMContentLoaded', () => {
  // Make Supabase client globally accessible
  window.supabaseClient = window.supabase.createClient(
    'https://oiwqlyyxnpozsjfkofjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pd3FseXl4bnBvenNqZmtvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjk2NTUsImV4cCI6MjA3NjYwNTY1NX0.GqozfTSNCHzTlr_eWswquuggWFBEm5FhnKpuPwubC0w'
  );

  // Define addPoints only after Supabase is ready
  window.addPoints = async function(username, amount) {
    const { data: userData, error: fetchError } = await window.supabaseClient
      .from('users')
      .select('username, points')
      .eq('username', username);

    console.log('Raw fetch result:', userData);

    if (fetchError || !userData || userData.length === 0) {
      console.error('Error fetching user:', fetchError);
      return;
    }

    const newPoints = userData[0].points + amount;

    const { data, error } = await window.supabaseClient
      .from('users')
      .update({ points: newPoints })
      .eq('username', username);

    if (error) {
      console.error('Error updating points:', error);
    } else {
      console.log('Points updated:', data);
    }
  };
});
