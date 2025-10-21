window.addEventListener('DOMContentLoaded', () => {
  const supabaseClient = window.supabase.createClient(
    'https://oiwqlyyxnpozsjfkofjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pd3FseXl4bnBvenNqZmtvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjk2NTUsImV4cCI6MjA3NjYwNTY1NX0.GqozfTSNCHzTlr_eWswquuggWFBEm5FhnKpuPwubC0w'
  );

  window.addPoints = async function(username, amount) {
    // Fetch current points
    const { data: userData, error: fetchError } = await supabaseClient
      .from('users')
      .select('points')
      .eq('username', username)
      .single();

    if (fetchError || !userData) {
      console.error('Error fetching user:', fetchError);
      return;
    }

    const newPoints = userData.points + amount;

    // Update with new total
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
});
