window.addEventListener('DOMContentLoaded', () => {
  // Declare supabase globally
  window.supabaseClient = window.supabase.createClient(
    'https://oiwqlyyxnpozsjfkofjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pd3FseXl4bnBvenNqZmtvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjk2NTUsImV4cCI6MjA3NjYwNTY1NX0.GqozfTSNCHzTlr_eWswquuggWFBEm5FhnKpuPwubC0w'
  );

  // Make addPoints globally accessible
  window.addPoints = async function(username, amount) {
    const { data, error } = await window.supabaseClient
      .from('users')
      .update({ points: window.supabaseClient.rpc('increment_points', { amount }) })
      .eq('username', username);

    if (error) {
      console.error('Error updating points:', error);
    } else {
      console.log('Points updated:', data);
    }
  };
});
